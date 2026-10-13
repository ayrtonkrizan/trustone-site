/* ==========================================================================
   TrustOne Solutions — script.js
   JavaScript vanilla para comportamentos de UI: navegação mobile, scroll do
   header e animação das métricas de impacto.
   ========================================================================== */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. ELEMENTOS DO DOM
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const metricNumbers = document.querySelectorAll('.metric-card__number');
  const modalTriggers = document.querySelectorAll('[data-modal-open]');

  // --------------------------------------------------------------------------
  // 2. SCROLL DO HEADER
  // Adiciona/remova classe de sombra conforme o scroll vertical.
  // --------------------------------------------------------------------------
  function handleHeaderScroll() {
    if (!header) return;

    if (window.scrollY > 10) {
      header.classList.add('site-header--scrolled');
    } else {
      header.classList.remove('site-header--scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // --------------------------------------------------------------------------
  // 3. MENU MOBILE
  // Alterna a visibilidade da navegação e atualiza atributos de acessibilidade.
  // --------------------------------------------------------------------------
  function toggleMenu() {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  }

  function closeMenu() {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em um link (mobile)
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Fecha o menu ao redimensionar para desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. ANIMAÇÃO DE CONTAGEM DAS MÉTRICAS
  // Utiliza IntersectionObserver para iniciar a contagem apenas quando o
  // elemento entrar na viewport, respeitando acessibilidade e performance.
  // --------------------------------------------------------------------------
  function animateValue(element, target, duration) {
    const start = 0;
    const startTime = performance.now();
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out quart para suavizar a parada
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (target - start) * ease);

      element.textContent = prefix + current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = prefix + target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const element = entry.target;
            const target = parseInt(element.dataset.target, 10) || 0;
            animateValue(element, target, 1500);
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.4 }
    );

    metricNumbers.forEach(function (number) {
      observer.observe(number);
    });
  } else {
    // Fallback: exibe o valor final sem animação
    metricNumbers.forEach(function (number) {
      const target = parseInt(number.dataset.target, 10) || 0;
      const prefix = number.dataset.prefix || '';
      const suffix = number.dataset.suffix || '';
      number.textContent = prefix + target + suffix;
    });
  }

  // --------------------------------------------------------------------------
  // 5. MODAIS DE ENTREVISTA (casos de sucesso)
  // Abre o <dialog> indicado por data-modal-open; fecha via data-modal-close
  // ou clique no backdrop. O Esc é tratado nativamente pelo elemento <dialog>.
  // --------------------------------------------------------------------------
  modalTriggers.forEach(function (trigger) {
    const modal = document.getElementById(trigger.dataset.modalOpen);
    if (!modal) return;

    trigger.addEventListener('click', function () {
      modal.showModal();
    });

    modal.addEventListener('click', function (event) {
      if (event.target === modal) {
        modal.close();
      }
    });

    modal.querySelectorAll('[data-modal-close]').forEach(function (closeButton) {
      closeButton.addEventListener('click', function () {
        modal.close();
      });
    });
  });
})();

// --------------------------------------------------------------------------
// FORMULÁRIO DE CONTATO → proxy serverless (worker/) → API da Plataforma
// O token da Plataforma fica só no proxy; aqui apenas o endpoint público.
// --------------------------------------------------------------------------
(function () {
  'use strict';
  var LEAD_ENDPOINT = 'https://us-central1-trustone-app-aprovacao.cloudfunctions.net/api/leads/website'; // trust-hub: apps/api, rota /leads/website
  var form = document.getElementById('contactForm');
  if (!form) return;
  var status = document.getElementById('contactStatus');
  var btn = form.querySelector('button[type="submit"]');
  var pending = null; // { key, body } preservado para retentativas

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : (r & 3) | 8).toString(16);
    });
  }
  function say(msg, cls) { status.textContent = msg; status.className = 'lead-form__status ' + (cls || ''); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = false;
    form.querySelectorAll('[required]').forEach(function (el) {
      var ok = el.value.trim() !== '' && el.checkValidity();
      el.classList.toggle('is-invalid', !ok);
      if (!ok) bad = true;
    });
    var phone = form.elements.phone;
    if (!/^\+?[0-9\s().-]{10,30}$/.test(phone.value.trim())) { phone.classList.add('is-invalid'); bad = true; }
    if (bad) { say('Revise os campos destacados.', 'is-error'); return; }
    if (form.elements.website.value) return; // honeypot

    var data = {};
    new FormData(form).forEach(function (v, k) { if (k !== 'website') data[k] = String(v).trim(); });
    if (!data.message) delete data.message;
    var body = JSON.stringify(data);
    // Mesmo payload => mesma chave (retentativa); payload novo => nova chave.
    if (!pending || pending.body !== body) pending = { key: uuid(), body: body };

    btn.disabled = true; say('Enviando…');
    fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': pending.key },
      body: body
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) { return { r: r, j: j }; });
    }).then(function (x) {
      if (x.r.ok) {
        form.reset(); pending = null;
        say('Recebemos sua mensagem! Nossa equipe retornará em breve.', 'is-ok');
      } else if (x.r.status === 422) {
        say('Alguns dados são inválidos. Revise o formulário e tente novamente.', 'is-error');
      } else if (x.r.status === 429) {
        say('Muitas tentativas. Aguarde um instante e tente novamente.', 'is-error');
      } else {
        say('Não foi possível enviar agora. Tente novamente ou escreva para comercial@trustone.solutions.', 'is-error');
      }
    }).catch(function () {
      say('Falha de conexão. Tente novamente — seus dados não serão duplicados.', 'is-error');
    }).then(function () { btn.disabled = false; });
  });
  form.addEventListener('input', function (e) { e.target.classList.remove('is-invalid'); });
})();

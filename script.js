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
})();

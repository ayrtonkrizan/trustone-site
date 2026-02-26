document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleMobile = document.getElementById("theme-toggle-mobile");
  const cookieBanner = document.getElementById("cookie-banner");
  const cookieAccept = document.getElementById("cookie-accept");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const container = document.querySelector(".testimonials-grid"); // pode ser null

  // ===== I18N / TRANSLATIONS =====
  const translations = {
    pt: {
      nav_trusthub: "TrustHub",
      nav_funcionalidades: "Funcionalidades",
      nav_contato: "Contato",
      lang_portuguese: "Português",
      lang_english: "English",
      lang_spanish: "Español",
      hero_title: 'Conheça o <span class="highlight">TrustHub</span>',
      hero_description: "Aprovações em segundos.<br>Simples, seguro e 100% integrado ao seu ERP.<br>Menos burocracia, mais velocidade, resultados imediatos.",
      showcase_subtitle: "A forma mais rápida, moderna e segura de aprovar compras, vendas, contratos, despesas e solicitações — direto do celular.",
      process_title: 'Como funciona o processo de <span class="highlight">aprovação</span>?',
      step1_title: "1. Geração do Pedido",
      step1_desc: "O pedido (compra, venda, despesa) é gerado no seu sistema ERP.",
      step2_title: "2. Notificação Imediata",
      step2_desc: "O gestor responsável recebe a notificação no aplicativo TrustHub.",
      step3_title: "3. Aprovação em Segundos",
      step3_desc: "O gestor aprova ou rejeita a solicitação com um toque no celular.",
      step4_title: "4. Sincronização Automática",
      step4_desc: "A decisão é sincronizada automaticamente com o seu ERP, finalizando o processo.",
      features_title: 'O App em <span class="highlight">Ação.</span>',
      features_subtitle: "Rápido, simples e pensado para o gestor moderno.",
      feature1_title: "Gestão Completa",
      feature1_desc: "Gerencie todas as suas aprovações de compras, vendas, contratos e despesas em um só lugar.",
      feature1_item1: "Gestão completa de aprovações",
      feature1_item2: "Histórico completo e rastreabilidade",
      feature2_title: "Interface e Velocidade",
      feature2_desc: "Aprovação imediata com um toque, através de uma interface simples e intuitiva.",
      feature2_item1: "Interface simples e intuitiva",
      feature2_item2: "Aprovação imediata com um toque",
      feature3_title: "Segurança e Alcance",
      feature3_desc: "Segurança de nível Google.<br>Suporte a múltiplos idiomas para equipes globais.",
      feature3_item1: "Segurança com tecnologia Google",
      feature3_item2: "Idiomas: Português, Inglês e Espanhol",
      benefits_title: 'Os gestores ganham tempo. <span class="highlight">A empresa ganha dinheiro.</span>',
      benefit1_title: "Eficiência Operacional",
      benefit1_item1: "⏳ Redução média de 40% no tempo de aprovação",
      benefit1_item2: "❌ Eliminação de gargalos operacionais",
      benefit2_title: "Impacto<br> Financeiro",
      benefit2_item1: "💼 Melhora do fluxo de caixa",
      benefit2_item2: "💰 Redução de custos com licenças SAP/Cloud",
      benefit3_title: "Governança e Rastreio",
      benefit3_item1: "📑 Conformidade garantida",
      benefit3_item2: "🧭 Transparência total do processo",
      migration_title: 'Por que as empresas estão <span class="highlight">migrando</span>?',
      migration1_title: "Aberto para integrações",
      migration1_desc: "Não exige licença SAP/Cloud e possui API RESTful.",
      migration1_item1: "🔒 Não precisa de licença SAP/Cloud",
      migration1_item2: "⚙ API RESTful para facilitar sua integração",
      migration2_title: "Performance e UX",
      migration2_desc: "Construído com tecnologia Google para alta performance, com uma interface moderna e fácil de usar.",
      migration2_item1: "🌐 Tecnologia Google de alta performance",
      migration2_item2: "📱 Interface moderna e fácil de usar",
      migration3_title: "Customização e Agilidade",
      migration3_desc: "Aparencia customizável, regras configuráveis e aprovações instantâneas.",
      migration3_item1: "🧮 Cards customizados",
      migration3_item2: "⚡ Tema configurável",
      migration3_item3: "🛠 Multi-idioma",
      target_title: 'Para quem é o <span class="highlight">TrustHub</span>?',
      target_subtitle: "Ideal para empresas que:",
      target_item1: " Possuem vários níveis de aprovação",
      target_item2: " Têm gestores externos ou em viagem",
      target_item3: " Querem reduzir custos com licenças",
      target_item4: " Precisam agilizar compras, vendas e financeiro",
      faq_title: "Perguntas Frequentes",
      faq1_question: "O que o app faz?",
      faq1_answer: "✔ Aprovação de compras<br>✔ Aprovação de vendas<br>✔ Aprovação de contratos<br>✔ Aprovação de despesas<br>✔ Alertas automáticos<br>",
      faq2_question: "Quem deve usar?",
      faq2_answer: "Empresas com alto volume de solicitações e múltiplos níveis de aprovação.",
      faq3_question: "É seguro?",
      faq3_answer: "Infraestrutura Google com alta estabilidade e segurança, garantindo a proteção dos seus dados.",
      contact_title: "Quer ver o app funcionando?",
      contact_subtitle: "Preencha o formulário e nossa equipe entrará em contato",
      footer_tagline: "Transformando negócios através da tecnologia",
      footer_legal_title: "Informações Legais",
      footer_privacy: "Política de Privacidade",
      footer_cookies: "Política de Cookies",
      footer_contact_title: "Contato",
      footer_copyright: "&copy; 2025 TrustOne Solutions. Todos os direitos reservados.",
      cookie_message: "Este site utiliza cookies para melhorar sua experiência. ",
      cookie_learn_more: "Saiba mais",
      cookie_accept: "Aceitar"
    },
    en: {
      nav_trusthub: "TrustHub",
      nav_funcionalidades: "Features",
      nav_contato: "Contact",
      lang_portuguese: "Português",
      lang_english: "English",
      lang_spanish: "Español",
      hero_title: 'Experience <span class="highlight">TrustHub</span>',
      hero_description: "Approvals in seconds.<br>Simple, secure and 100% integrated with your ERP.<br>Less bureaucracy, more speed, instant results.",
      showcase_subtitle: "The fastest, most modern and safest way to approve purchases, sales, contracts, expenses and requests — all from the palm of your hand.",
      process_title: 'How does the <span class="highlight">approval</span> process work?',
      step1_title: "1. Order Placement",
      step1_desc: "The order (purchase, sale, expense) is generated in your ERP system.",
      step2_title: "2. Immediate Notification",
      step2_desc: "The responsible manager receives the notification on TrustHub application.",
      step3_title: "3. Instant Approval ",
      step3_desc: "The manager approves or rejects  requests with just a touch.",
      step4_title: "4. Automatic Synchronization",
      step4_desc: "The decision is automatically linked with your ERP, finishing the process.",
      features_title: 'The App in <span class="highlight">Action.</span>',
      features_subtitle: "Unmatched agility for managers on the go.",
      feature1_title: "Complete Management",
      feature1_desc: "Manage all your purchase, sale, contract and expense approvals in one place.",
      feature1_item1: "Full approval management",
      feature1_item2: "Complete history and traceability",
      feature2_title: "Interface and Speed",
      feature2_desc: "Instant one touch approval , through a simple and intuitive interface.",
      feature2_item1: "Simple and intuitive interface",
      feature2_item2: "Instant one-touch approval",
      feature3_title: "Security and Reach",
      feature3_desc: "Google-level security.<br>Multilingual support for global teams.",
      feature3_item1: "Secured by Google technology",
      feature3_item2: "Languages: Portuguese, English and Spanish",
      benefits_title: 'Managers save time. <span class="highlight">The company saves money.</span>',
      benefit1_title: "Operational Efficiency",
      benefit1_item1: "⏳ Average 40% reduction in approval time",
      benefit1_item2: "❌ Optimizing operational throughput",
      benefit2_title: "Financial Impact",
      benefit2_item1: "💼 Optimized cash flow",
      benefit2_item2: "💰 Reduced costs with SAP/Cloud licenses",
      benefit3_title: "Governance and Traceability",
      benefit3_item1: "📑 Guaranteed compliance",
      benefit3_item2: "🧭 Total process transparency",
      migration_title: 'Why are companies <span class="highlight">migrating</span>?',
      migration1_title: "Open for integrations",
      migration1_desc: "Independent of SAP/Cloud licenses with full RESTful API integration.",
      migration1_item1: "🔒 No SAP/Cloud license needed",
      migration1_item2: "⚙ Plug-and-play RESTful API integration",
      migration2_title: "Performance and UX",
      migration2_desc: "Built with Google technology for high performance, with a modern and intuitive interface.",
      migration2_item1: "🌐 High-performance Google technology",
      migration2_item2: "📱 Modern and intuitive interface",
      migration3_title: "Customization and Agility",
      migration3_desc: "Branded experience, adaptive workflows, and zero-latency approvals.",
      migration3_item1: "🧮 Cards customization",
      migration3_item2: "⚡ Configurable theme",
      migration3_item3: "🛠 Multilingual",
      target_title: 'Is <span class="highlight">TrustHub</span> right for you?',
      target_subtitle: "Ideal for companies that:",
      target_item1: " Companies with multiple approval levels",
      target_item2: " Teams with remote or traveling managers",
      target_item3: " Minimizing SAP/Cloud licensing overhead",
      target_item4: " Streamlining Sales and Purchasing workflows",
      faq_title: " Common Questions",
      faq1_question: "What does the app do?",
      faq1_answer: "✔ Purchase approval<br>✔ Sales approval<br>✔ Contract approval<br>✔ Expense approval<br>✔ Automatic alerts<br>",
      faq2_question: "Who should use it?",
      faq2_answer: "Companies with high volume of requests and multiple levels of approval.",
      faq3_question: "Is it safe?",
      faq3_answer: "Google infrastructure with high stability and security, ensuring your data protection.",
      contact_title: "Want to see the app working?",
      contact_subtitle: "Fill out the form and our team will be in touch",
      footer_tagline: "Transforming business through technology",
      footer_legal_title: "Legal Information",
      footer_privacy: "Privacy Policy",
      footer_cookies: "Cookies Policy",
      footer_contact_title: "Contact",
      footer_copyright: "&copy; 2025 TrustOne Solutions. All rights reserved.",
      cookie_message: "This site uses cookies to improve your experience. ",
      cookie_learn_more: "Learn more",
      cookie_accept: "Accept"
    },
    es: {
      nav_trusthub: "TrustHub",
      nav_funcionalidades: "Funcionalidades",
      nav_contato: "Contacto",
      lang_portuguese: "Português",
      lang_english: "English",
      lang_spanish: "Español",
      hero_title: 'Conozca <span class="highlight">TrustHub</span>',
      hero_description: "Aprobaciones en segundos.<br>Simple, seguro y 100% integrado a su ERP.<br>Menos burocracia, más velocidad, resultados inmediatos.",
      showcase_subtitle: "La forma más rápida, moderna y segura de aprobar compras, ventas, contratos, gastos y solicitudes — directamente desde el móvil.",
      process_title: '¿Cómo funciona el proceso de <span class="highlight">aprobación</span>?',
      step1_title: "1. Generación del Pedido",
      step1_desc: "El pedido (compra, venta, gasto) se genera en su sistema ERP.",
      step2_title: "2. Notificación Inmediata",
      step2_desc: "El gestor responsable recibe la notificación en la aplicación TrustHub.",
      step3_title: "3. Aprobación en Segundos",
      step3_desc: "El gestor aprueba o rechaza la solicitud con un toque en el móvil.",
      step4_title: "4. Sincronización Automática",
      step4_desc: "La decisión se sincroniza automáticamente con su ERP, finalizando el proceso.",
      features_title: 'La App en <span class="highlight">Acción.</span>',
      features_subtitle: "Rápido, simple y pensado para el gestor moderno.",
      feature1_title: "Gestión Completa",
      feature1_desc: "Gestione todas sus aprobaciones de compras, ventas, contratos y gastos en un solo lugar.",
      feature1_item1: "Gestión completa de aprobaciones",
      feature1_item2: "Historial completo y trazabilidad",
      feature2_title: "Interfaz y Velocidad",
      feature2_desc: "Aprobación inmediata con un toque, a través de una interfaz sencilla e intuitiva.",
      feature2_item1: "Interfaz sencilla e intuitiva",
      feature2_item2: "Aprobación inmediata con un toque",
      feature3_title: "Seguridad y Alcance",
      feature3_desc: "Seguridad de nivel Google.<br>Soporte a múltiples idiomas para equipos globales.",
      feature3_item1: "Seguridad con tecnología Google",
      feature3_item2: "Idiomas: Portugués, Inglés y Español",
      benefits_title: 'Los gestores ganan tiempo. <span class="highlight">La empresa gana dinero.</span>',
      benefit1_title: "Eficiencia Operativa",
      benefit1_item1: "⏳ Reducción media del 40% en el tiempo de aprobación",
      benefit1_item2: "❌ Eliminación de cuellos de botella operativos",
      benefit2_title: "Impacto<br> Financiero",
      benefit2_item1: "💼 Mejora del flujo de caja",
      benefit2_item2: "💰 Reducción de costes con licencias SAP/Cloud",
      benefit3_title: "Gobernanza y Rastreo",
      benefit3_item1: "📑 Cumplimiento garantizado",
      benefit3_item2: "🧭 Transparencia total del proceso",
      migration_title: '¿Por qué las empresas están <span class="highlight">migrando</span>?',
      migration1_title: "Abierto para integraciones",
      migration1_desc: "No requiere licencia SAP/Cloud y posee API RESTful.",
      migration1_item1: "🔒 No necesita licencia SAP/Cloud",
      migration1_item2: "⚙ API RESTful para facilitar su integración",
      migration2_title: "Rendimiento y UX",
      migration2_desc: "Construido con tecnología Google para un alto rendimiento, con una interfaz moderna y fácil de usar.",
      migration2_item1: "🌐 Tecnología Google de alto rendimiento",
      migration2_item2: "📱 Interfaz moderna y fácil de usar",
      migration3_title: "Personalización y Agilidad",
      migration3_desc: "Apariencia personalizable, reglas configurables y aprobaciones instantáneas.",
      migration3_item1: "🧮 Tarjetas personalizadas",
      migration3_item2: "⚡ Tema configurable",
      migration3_item3: "🛠 Multi-idioma",
      target_title: '¿Para quién es <span class="highlight">TrustHub</span>?',
      target_subtitle: "Ideal para empresas que:",
      target_item1: " Tienen varios niveles de aprobación",
      target_item2: " Tienen gestores externos o en viaje",
      target_item3: " Quieren reducir costes de licencias",
      target_item4: " Necesitan agilizar compras, ventas y finanzas",
      faq_title: "Preguntas Frecuentes",
      faq1_question: "¿Qué hace la app?",
      faq1_answer: "✔ Aprobación de compras<br>✔ Aprobación de ventas<br>✔ Aprobación de contratos<br>✔ Aprobación de gastos<br>✔ Alertas automáticas<br>",
      faq2_question: "¿Quién debe usarla?",
      faq2_answer: "Empresas con alto volumen de solicitudes y múltiples niveles de aprobación.",
      faq3_question: "¿Es seguro?",
      faq3_answer: "Infraestructura Google con alta estabilidad y seguridad, garantizando la protección de sus datos.",
      contact_title: "¿Quiere ver la app funcionando?",
      contact_subtitle: "Complete el formulario y nuestro equipo se pondrá en contacto",
      footer_tagline: "Transformando negocios a través de la tecnología",
      footer_legal_title: "Información Legal",
      footer_privacy: "Política de Privacidad",
      footer_cookies: "Política de Cookies",
      footer_contact_title: "Contacto",
      footer_copyright: "&copy; 2025 TrustOne Solutions. Todos los derechos reservados.",
      cookie_message: "Este sitio utiliza cookies para mejorar su experiencia. ",
      cookie_learn_more: "Saber más",
      cookie_accept: "Aceptar"
    }
  };

  // ===== FUNÇÃO DE ATUALIZAÇÃO DE IDIOMA =====
  function updateLanguage(lang) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    const langNames = { pt: "Português", en: "English", es: "Español" };
    const flags    = { pt: "🇧🇷",       en: "🇺🇸",      es: "🇪🇸"      };

    // Atualiza botão desktop
    const currentLangText = document.getElementById("current-lang");
    if (currentLangText) currentLangText.innerText = langNames[lang] || "Português";

    const currentFlag = document.getElementById("current-flag");
    if (currentFlag) currentFlag.textContent = flags[lang] || "🇧🇷";

    // Atualiza botão mobile
    const currentLangMobile = document.getElementById("current-lang-mobile");
    if (currentLangMobile) currentLangMobile.innerText = langNames[lang] || "Português";

    const currentFlagMobile = document.getElementById("current-flag-mobile");
    if (currentFlagMobile) currentFlagMobile.textContent = flags[lang] || "🇧🇷";

    localStorage.setItem("language", lang);
    document.documentElement.lang =
      lang === "en" ? "en" :
      lang === "es" ? "es" :
      "pt-BR";
  }

  // ===== LANGUAGE SELECTOR DESKTOP =====
  const langBtn  = document.getElementById("lang-btn");
  const langMenu = document.getElementById("lang-menu");

  if (langBtn && langMenu) {
    const langSelector = langBtn.closest(".language-selector");

    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langMenu.classList.toggle("show");
      if (langSelector) langSelector.classList.toggle("open");
    });

    langMenu.querySelectorAll("li").forEach((li) => {
      li.addEventListener("click", () => {
        updateLanguage(li.getAttribute("data-lang"));
        langMenu.classList.remove("show");
        if (langSelector) langSelector.classList.remove("open");
      });
    });

    document.addEventListener("click", (e) => {
      if (langSelector && !langSelector.contains(e.target)) {
        langMenu.classList.remove("show");
        langSelector.classList.remove("open");
      }
    });
  }

  // ===== LANGUAGE SELECTOR MOBILE =====
  const langBtnMobile  = document.getElementById("lang-btn-mobile");
  const langMenuMobile = document.getElementById("lang-menu-mobile");

  if (langBtnMobile && langMenuMobile) {
    const langSelectorMobile = langBtnMobile.closest(".language-selector");

    langBtnMobile.addEventListener("click", () => {
      
      langMenuMobile.classList.toggle("show");
      if (langSelectorMobile) langSelectorMobile.classList.toggle("open");
    });

    langMenuMobile.querySelectorAll("li").forEach((li) => {
      li.addEventListener("click", () => {
        updateLanguage(li.getAttribute("data-lang"));
        langMenuMobile.classList.remove("show");
        if (langSelectorMobile) langSelectorMobile.classList.remove("open");
      });
    });

    document.addEventListener("click", (e) => {
      if (langSelectorMobile && !langSelectorMobile.contains(e.target)) {
        langMenuMobile.classList.remove("show");
        if (langSelectorMobile) langSelectorMobile.classList.remove("open");
      }
    });
  }

  // Carrega idioma salvo ou padrão
  const savedLang = localStorage.getItem("language") || "pt";
  updateLanguage(savedLang);

  // ===== THEME TOGGLE (Desktop + Mobile sincronizado) =====
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeToggle) themeToggle.checked = theme === "dark";
    if (themeToggleMobile) themeToggleMobile.checked = theme === "dark";
  }

  // Carrega tema salvo ou padrão
  const currentTheme = localStorage.getItem("theme") || "light";
  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      applyTheme(themeToggle.checked ? "dark" : "light");
    });
  }
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener("change", () => {
      applyTheme(themeToggleMobile.checked ? "dark" : "light");
    });
  }

  // ===== COOKIE BANNER =====
  if (cookieBanner && cookieAccept) {
    const hasAcceptedCookies = localStorage.getItem("cookieConsent");
    if (!hasAcceptedCookies) {
      setTimeout(() => cookieBanner.classList.add("show"), 1000);
    }
    cookieAccept.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "true");
      cookieBanner.classList.remove("show");
    });
  }


 // ===== HAMBURGER MENU =====
if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        hamburger.classList.toggle("active");
    });
    document.querySelectorAll(".nav-menu .nav-link").forEach((n) =>
        n.addEventListener("click", () => {
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
        })
    );

    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", (e) => {
        if (!navMenu.contains(e.target) &&
            !hamburger.contains(e.target)) {
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
        }
    });
}

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ===== FAQ ACCORDION =====
  document.querySelectorAll(".faq-item .faq-question").forEach((q) => {
    q.addEventListener("click", () =>
      q.parentElement.classList.toggle("active")
    );
  });

  // ===== TESTIMONIALS: shuffle (só se existir container) =====
  if (container) {
    const cards = Array.from(container.querySelectorAll(".testimonial-card"));
    if (cards.length > 1) {
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      container.innerHTML = "";
      cards.forEach((card) => container.appendChild(card));
    }
  }

  // ===== TESTIMONIALS: scroll com roda do mouse =====
  const testimonialsGrid = document.querySelector(".testimonials-grid");
  if (testimonialsGrid) {
    testimonialsGrid.addEventListener(
      "wheel",
      (evt) => {
        if (evt.deltaY !== 0) {
          evt.preventDefault();
          testimonialsGrid.scrollBy({
            left: evt.deltaY < 0 ? -100 : 100,
            behavior: "smooth",
          });
        }
      },
      { passive: false }
    );
  }

  // ===== TESTIMONIALS: scroll-dots =====
  const dotsContainer = document.querySelector(".scroll-dots");
  if (testimonialsGrid && dotsContainer) {
    const cards = testimonialsGrid.querySelectorAll(".testimonial-card");

    cards.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);

      dot.addEventListener("click", () => {
        testimonialsGrid.scrollTo({
          left: cards[index].offsetLeft,
          behavior: "smooth",
        });
      });
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    testimonialsGrid.addEventListener("scroll", () => {
      const maxScroll = testimonialsGrid.scrollWidth - testimonialsGrid.clientWidth;
      const scrollRatio = testimonialsGrid.scrollLeft / maxScroll;
      const index = Math.round(scrollRatio * (cards.length - 1));
      dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    });
  }

  // ===== RESULTS COUNTER ANIMATION =====
  const resultsSection = document.querySelector(".results-section");
  if (resultsSection) {
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.2 };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".result-number").forEach((counter) => {
            const target = +counter.getAttribute("data-target");
            let current = 0;
            const increment = target / 200;

            const updateCounter = () => {
              if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current) + (counter.dataset.suffix || "");
                setTimeout(updateCounter, 15);
              } else {
                counter.innerText = target + (counter.dataset.suffix || "");
              }
            };

            updateCounter();
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    observer.observe(resultsSection);
  }
});
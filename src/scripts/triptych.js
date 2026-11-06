/**
 * SIETE CENTROS — Triptych 3-Column Interactive Orchestrator
 * Left Flank: 7-Chakra Navigation (VII -> I) + Orbs Synchronization
 * Right Flank: Canvas Particles (flanks only) + Spotlight + Dynamic Cards + Magnetic CTA
 * Center Column: 520px fixed, 4 seamless videos, golden shimmer spine, 1.02 hover zoom
 */

import { JOURNAL_ARTICLES } from './journal-articles.js';

export function initTriptych() {
  const centerSpine = document.querySelector('.triptych-spine-center');
  const navItems = document.querySelectorAll('.chakra-nav-item');
  const centerOrbs = document.querySelectorAll('.center-chakra-orb');
  const rightFlank = document.querySelector('.triptych-flank-right');
  const cardDisplay = document.querySelector('.flank-chakra-card-display');
  const magneticBtn = document.querySelector('.magnetic-circle-btn');
  const magneticWrap = document.querySelector('.magnetic-btn-wrap');
  const canvas = document.getElementById('flank-particles-canvas');

  // Chakra Data Dictionary (VII to I)
  const chakraData = {
    '7': {
      numeral: 'CENTRO VII',
      name: 'Corona',
      sanskrit: 'Sahasrara',
      color: '#C084FC',
      desc: 'La disolución de la dualidad en conciencia pura. El despertar al silencio infinito que todo lo abraza.',
      concepts: ['Conciencia Pura', 'Trascendencia', 'Silencio Sagrado', 'Unidad']
    },
    '6': {
      numeral: 'CENTRO VI',
      name: 'Tercer Ojo',
      sanskrit: 'Ajna',
      color: '#818CF8',
      desc: 'El ojo interior que percibe más allá de las apariencias. Intuición lúcida y discernimiento calmo.',
      concepts: ['Visión Interior', 'Intuición', 'Claridad', 'Testigo Lúcido']
    },
    '5': {
      numeral: 'CENTRO V',
      name: 'Garganta',
      sanskrit: 'Vishuddha',
      color: '#38BDF8',
      desc: 'El puente sagrado entre el sentir y el pensamiento. Manifestar la verdad con pureza y resonancia.',
      concepts: ['Expresión Sagrada', 'Verdad', 'Resonancia', 'Canto Primordial']
    },
    '4': {
      numeral: 'CENTRO IV',
      name: 'Corazón',
      sanskrit: 'Anahata',
      color: '#34D399',
      desc: 'El altar central donde la tierra y el cosmos se encuentran en un solo latido compasivo e incondicional.',
      concepts: ['Amor Incondicional', 'Compasión', 'Apertura', 'Devoción Somática']
    },
    '3': {
      numeral: 'CENTRO III',
      name: 'Plexo Solar',
      sanskrit: 'Manipura',
      color: '#FBBF24',
      desc: 'La hoguera dorada de la soberanía personal. Voluntad serena que transmuta la inercia en acción consciente.',
      concepts: ['Fuego Vital', 'Soberanía', 'Confianza', 'Poder Serena']
    },
    '2': {
      numeral: 'CENTRO II',
      name: 'Sacro',
      sanskrit: 'Svadhisthana',
      color: '#FB923C',
      desc: 'El océano de las aguas creativas y la sensualidad sagrada. Permitirse fluir y gozar la belleza de la existencia.',
      concepts: ['Fluidez Somática', 'Creatividad', 'Gozoso Deseo', 'Sensibilidad']
    },
    '1': {
      numeral: 'CENTRO I',
      name: 'Raíz',
      sanskrit: 'Muladhara',
      color: '#F43F5E',
      desc: 'El ancla volcánica en el vientre de la tierra. Seguridad biológica, presencia firme y el portal al infinito dorado.',
      concepts: ['Enraizamiento', 'Estabilidad', 'Cuerpo Primordial', 'Infinito Dorado']
    }
  };

  // 1. Ensure all 4 Videos are in 100% loop with camera fixed
  const videos = document.querySelectorAll('.spine-video-item');
  videos.forEach((v) => {
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.play().catch(() => {});
  });

  // 2. Active Chakra Card Updater
  function updateActiveChakraUI(chakraId) {
    const data = chakraData[chakraId];
    if (!data) return;

    // Update left nav active class
    navItems.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.chakra === chakraId);
    });

    // Update center orbs highlight
    centerOrbs.forEach((orb) => {
      orb.classList.toggle('highlighted', orb.dataset.chakra === chakraId);
    });

    // Update right flank card
    if (cardDisplay) {
      cardDisplay.innerHTML = `
        <div class="active-chakra-card" style="border-color: ${data.color}; box-shadow: 0 15px 40px rgba(0,0,0,0.8), 0 0 25px ${data.color}33;">
          <div class="active-card-meta">
            <span class="active-card-numeral">${data.numeral}</span>
            <span class="active-card-sanskrit">${data.sanskrit}</span>
          </div>
          <h3 class="active-card-title">${data.name}</h3>
          <p class="active-card-desc">${data.desc}</p>
          <div class="active-card-concepts">
            ${data.concepts.map((c) => `<span class="active-card-pill" style="border-color: ${data.color}55;">${c}</span>`).join('')}
          </div>
        </div>
      `;
    }
  }

  // Initial UI state: Centro VII Corona
  updateActiveChakraUI('7');

  // 3. Left Navigation Interactivity (Hover & Click)
  navItems.forEach((btn) => {
    const chakraId = btn.dataset.chakra;

    // Hover: highlight center orb & show card on right
    btn.addEventListener('mouseenter', () => {
      updateActiveChakraUI(chakraId);
    });

    // Click: Smooth scroll to center orb section
    btn.addEventListener('click', () => {
      const targetOrb = document.querySelector(`.center-chakra-orb[data-chakra="${chakraId}"]`);
      if (targetOrb) {
        targetOrb.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  // Center Orbs Click Interactivity
  centerOrbs.forEach((orb) => {
    orb.addEventListener('click', () => {
      updateActiveChakraUI(orb.dataset.chakra);
    });
    orb.addEventListener('mouseenter', () => {
      updateActiveChakraUI(orb.dataset.chakra);
    });
  });

  // 4. Scroll Spy to dynamically update active chakra as user scrolls
  function onScrollSpy() {
    const winCenter = window.innerHeight / 2;
    let closestId = '7';
    let minDistance = Infinity;

    centerOrbs.forEach((orb) => {
      const rect = orb.getBoundingClientRect();
      const dist = Math.abs(rect.top + rect.height / 2 - winCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestId = orb.dataset.chakra;
      }
    });

    if (closestId) {
      // Update only nav active indicators without overriding manual hover
      navItems.forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.chakra === closestId);
      });
      centerOrbs.forEach((orb) => {
        orb.classList.toggle('highlighted', orb.dataset.chakra === closestId);
      });
    }
  }

  window.addEventListener('scroll', onScrollSpy, { passive: true });

  // 5. Magnetic CTA Button ("Entrar al círculo")
  if (magneticWrap && magneticBtn) {
    const strength = 0.35;
    const maxDistance = 90;

    window.addEventListener('mousemove', (e) => {
      const rect = magneticWrap.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const distX = e.clientX - btnCenterX;
      const distY = e.clientY - btnCenterY;
      const distance = Math.hypot(distX, distY);

      if (distance < maxDistance) {
        magneticBtn.style.transform = `translate(${distX * strength}px, ${distY * strength}px) scale(1.05)`;
      } else {
        magneticBtn.style.transform = 'translate(0px, 0px) scale(1)';
      }
    });

    magneticWrap.addEventListener('mouseleave', () => {
      magneticBtn.style.transform = 'translate(0px, 0px) scale(1)';
    });

    // Si el usuario hace clic en el enlace, navega a WhatsApp de forma natural
    magneticBtn.addEventListener('click', (e) => {
      // Abre en nueva pestaña el enlace de WhatsApp configurado
      const href = magneticBtn.getAttribute('href');
      if (href && !href.startsWith('#')) {
        // Enlace natural a WhatsApp
        return;
      }
      e.preventDefault();
      window.open('https://wa.me/528121912778?text=Hola%2C%20deseo%20informaci%C3%B3n%20sobre%20Siete%20Centros%20Escuela%20de%20Conciencia', '_blank');
    });
  }

  // Interacción del Navbar Superior (Menu Simple Arriba)
  const topNavLinks = document.querySelectorAll('.top-nav-link');
  topNavLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetTab = link.dataset.tabTarget;
      if (targetTab) {
        // Si apunta a un tab interactivo (ej. retiros o breathwork)
        setTimeout(() => {
          const tabBtn = document.querySelector(`.hub-nav-tab-btn[data-tab="${targetTab}"]`);
          if (tabBtn) {
            tabBtn.click();
          }
        }, 150);
      }

      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const navHeight = 54;
          const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navHeight - 16;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 6. Right Flank Spotlight (follows cursor)
  if (rightFlank) {
    window.addEventListener('mousemove', (e) => {
      const rect = rightFlank.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right) {
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        rightFlank.style.setProperty('--mouse-x', `${relX}px`);
        rightFlank.style.setProperty('--mouse-y', `${relY}px`);
      }
    });
  }

  // 7. Flank Particles Canvas (Only in left and right flanks, never over 520px center)
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    class FlankParticle {
      constructor() {
        this.reset();
      }

      reset() {
        // Spawn strictly in left flank or right flank
        const centerLeft = (width - 520) / 2;
        const centerRight = (width + 520) / 2;
        const isLeft = Math.random() < 0.5;

        if (isLeft && centerLeft > 0) {
          this.x = Math.random() * centerLeft;
        } else if (centerRight < width) {
          this.x = centerRight + Math.random() * (width - centerRight);
        } else {
          this.x = Math.random() * width;
        }

        this.y = Math.random() * height;
        this.size = Math.random() * 1.8 + 0.6;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 20 + 5;
        this.alpha = Math.random() * 0.55 + 0.25;
        // 7 Chakra Sacred Colors: Raíz, Sacro, Plexo, Corazón, Garganta, Ajna, Corona
        const chakraColors = [
          '244, 63, 94',   // Muladhara (Raíz - Rojo Rubí)
          '251, 146, 60',  // Svadhisthana (Sacro - Naranja Ámbar)
          '251, 191, 36',  // Manipura (Plexo Solar - Dorado)
          '52, 211, 153',  // Anahata (Corazón - Esmeralda)
          '56, 189, 248',  // Vishuddha (Garganta - Cian Celestial)
          '129, 140, 248', // Ajna (Tercer Ojo - Índigo Sagrado)
          '192, 132, 252'  // Sahasrara (Corona - Violeta Amatista)
        ];
        this.color = chakraColors[Math.floor(Math.random() * chakraColors.length)];
        this.speedY = -(Math.random() * 0.4 + 0.1);
      }

      update() {
        const centerLeft = (width - 520) / 2;
        const centerRight = (width + 520) / 2;

        // Upward float
        this.y += this.speedY;
        if (this.y < 0) {
          this.y = height;
        }

        // Avoid entering center 520px column
        if (this.x > centerLeft && this.x < centerRight) {
          this.reset();
        }

        // Interactive gravitation towards cursor only in flanks
        const isCursorInFlank = mouseX < centerLeft || mouseX > centerRight;
        if (isCursorInFlank) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 140) {
            const force = (140 - distance) / 140;
            this.x -= (dx / distance) * force * 3;
            this.y -= (dy / distance) * force * 3;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.shadowBlur = this.size * 3.5;
        ctx.shadowColor = `rgba(${this.color}, 0.7)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const particleCount = Math.min(80, Math.floor(width / 20));
    const particles = Array.from({ length: particleCount }, () => new FlankParticle());

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // Initialize FAQ Accordion for Sanctuary Questions
  const faqButtons = document.querySelectorAll('.faq-question-btn');
  faqButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const parentItem = btn.closest('.faq-item');
      if (!parentItem) return;
      const isOpen = parentItem.classList.contains('is-open');

      // Close all other open FAQ items for a clean single-accordion feel
      document.querySelectorAll('.faq-item.is-open').forEach((item) => {
        if (item !== parentItem) {
          item.classList.remove('is-open');
          const itemBtn = item.querySelector('.faq-question-btn');
          if (itemBtn) itemBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        parentItem.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        parentItem.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 8. Journal Reader Modal Orchestration
  const journalModal = document.getElementById('journal-reader-modal');
  const journalModalClose = document.getElementById('journal-modal-close');
  const journalModalBackdrop = document.getElementById('journal-modal-backdrop');
  const journalArticleMount = document.getElementById('journal-modal-body');

  function openJournalArticle(articleId) {
    if (!journalModal || !journalArticleMount) return;
    const article = JOURNAL_ARTICLES.find((a) => a.id === articleId);
    if (!article) return;

    journalArticleMount.innerHTML = `
      <article class="journal-full-editorial">
        <header class="journal-editorial-header">
          <div class="journal-editorial-badges">
            <span class="journal-badge-cat">${article.category}</span>
            <span class="journal-badge-reading">⏳ ${article.readingTime}</span>
          </div>
          <h1 class="journal-editorial-title">${article.title}</h1>
          <div class="journal-editorial-meta">
            <span class="journal-editorial-author">✦ ${article.author}</span>
          </div>
        </header>

        <div class="journal-editorial-cover">
          <img src="${article.image}" alt="${article.title}" class="journal-editorial-img" />
        </div>

        <div class="journal-editorial-body">
          ${article.fullContent}
        </div>

        <footer class="journal-editorial-footer">
          <div class="journal-footer-cta-box">
            <h4>¿Deseas profundizar en esta vivencia sagrada?</h4>
            <p>Comunícate con nuestro Concierge para resolver dudas, consultar disponibilidad de elixires o iniciar tu camino en MOKKA CHAI.</p>
            <div class="journal-footer-btns">
              <a href="https://wa.me/528121912778?text=Hola%2C%20le%C3%AD%20el%20art%C3%ADculo%20sobre%20${encodeURIComponent(article.title)}%20en%20MOKKA%20CHAI%20y%20deseo%20m%C3%A1s%20informaci%C3%B3n" target="_blank" rel="noopener noreferrer" class="btn-journal-contact-wa">
                Consultar por WhatsApp (+52 81 2191 2778) →
              </a>
              <button type="button" class="btn-journal-close-footer" id="btn-journal-close-footer">Cerrar Artículo</button>
            </div>
          </div>
        </footer>
      </article>
    `;

    journalModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';

    const footerCloseBtn = document.getElementById('btn-journal-close-footer');
    if (footerCloseBtn) {
      footerCloseBtn.addEventListener('click', closeJournalModal);
    }
  }

  function closeJournalModal() {
    if (!journalModal) return;
    journalModal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  if (journalModalClose) journalModalClose.addEventListener('click', closeJournalModal);
  if (journalModalBackdrop) journalModalBackdrop.addEventListener('click', closeJournalModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && journalModal && journalModal.classList.contains('is-active')) {
      closeJournalModal();
    }
  });

  // Attach event delegation for read-article triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-article]');
    if (trigger) {
      e.preventDefault();
      const articleId = trigger.getAttribute('data-open-article');
      if (articleId) openJournalArticle(articleId);
    }
  });
}


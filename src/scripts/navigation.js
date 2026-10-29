/**
 * SIETE CENTROS — Navigation & Floating HUD Controller
 * Manejo robusto de navegación, HUD de Chakras y sincronización de Audio móvil.
 */

import { soundscape } from './audio.js';

export function initNavigation() {
  const header = document.querySelector('.master-top-navbar') || document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const chakraDots = document.querySelectorAll('.chakra-dot-btn');
  const chakraChapters = document.querySelectorAll('.chakra-chapter');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .top-nav-link');

  // 1. Sticky Header Scroll Effect con salvaguarda defensiva
  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  if (header) {
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();
  }

  // 2. Audio Button Toggle Móvil & Escritorio (Debounced para evitar dobles toques touch+click)
  let lastToggleTimestamp = 0;
  function handleAudioToggle(e) {
    if (e) {
      if (e.cancelable && e.type === 'touchend') e.preventDefault();
      e.stopPropagation();
    }
    const now = Date.now();
    if (now - lastToggleTimestamp < 350) return;
    lastToggleTimestamp = now;

    soundscape.toggle();
  }

  // Asignar listeners directos a todos los botones de audio presentes
  const audioButtons = document.querySelectorAll('.audio-toggle-btn');
  audioButtons.forEach((btn) => {
    btn.addEventListener('click', handleAudioToggle);
    btn.addEventListener('touchend', handleAudioToggle, { passive: false });
  });

  // Delegación global en document para botones inyectados dinámicamente o en subpáginas
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.audio-toggle-btn');
    if (btn) handleAudioToggle(e);
  });
  document.addEventListener('touchend', (e) => {
    const btn = e.target.closest('.audio-toggle-btn');
    if (btn) handleAudioToggle(e);
  }, { passive: false });

  // Sincronización visual del estado del reproductor
  soundscape.subscribe((playing, title) => {
    const allAudioBtns = document.querySelectorAll('.audio-toggle-btn');
    allAudioBtns.forEach((btn) => {
      btn.classList.toggle('is-playing', playing);
      btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
      const label = btn.querySelector('.audio-label');
      if (label) {
        label.textContent = playing ? '432Hz Activo' : 'Música';
      }
    });
  });

  // 3. Mobile Menu Toggle & Drawer (si existe en la página)
  function toggleMobileMenu(open) {
    if (!mobileDrawer || !mobileToggle) return;
    const shouldOpen = open !== undefined ? open : !mobileDrawer.classList.contains('is-open');
    mobileDrawer.classList.toggle('is-open', shouldOpen);
    mobileToggle.classList.toggle('is-open', shouldOpen);
    mobileToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleMobileMenu());
  }

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // Cerrar mobile drawer con Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      toggleMobileMenu(false);
    }
  });

  // 4. Floating Chakra HUD Click Handler (si existen dots)
  if (chakraDots.length > 0) {
    chakraDots.forEach((btn) => {
      btn.addEventListener('click', () => {
        const chakraId = btn.getAttribute('data-chakra');
        const targetChapter = document.getElementById(`centro-0${chakraId}`);
        if (targetChapter) {
          targetChapter.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // 5. Active Section & Chakra Spy via IntersectionObserver
  if (chakraChapters.length > 0 && typeof IntersectionObserver !== 'undefined') {
    const chapterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const chakraIndex = entry.target.getAttribute('data-chakra');
            chakraDots.forEach((dot) => {
              if (dot.getAttribute('data-chakra') === chakraIndex) {
                dot.classList.add('active');
              } else {
                dot.classList.remove('active');
              }
            });
          }
        });
      },
      { threshold: 0.35 }
    );
    chakraChapters.forEach((chapter) => chapterObserver.observe(chapter));
  }

  // 6. Main Nav Spy
  const mainSections = document.querySelectorAll('section[id]');
  if (mainSections.length > 0 && navLinks.length > 0 && typeof IntersectionObserver !== 'undefined') {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              const href = link.getAttribute('href');
              if (href === `#${id}` || href === `./#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      { threshold: 0.25 }
    );
    mainSections.forEach((section) => sectionObserver.observe(section));
  }
}


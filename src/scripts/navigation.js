/**
 * SIETE CENTROS — Navigation & Floating HUD Controller
 */

import { soundscape } from './audio.js';

export function initNavigation() {
  const header = document.querySelector('.site-header');
  const audioBtn = document.querySelector('.audio-toggle-btn');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const chakraDots = document.querySelectorAll('.chakra-dot-btn');
  const chakraChapters = document.querySelectorAll('.chakra-chapter');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  // 1. Sticky Header Scroll Effect
  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // 2. Audio Button Toggle (Synchronized with "Bienvenida al Silencio")
  const audioButtons = document.querySelectorAll('.audio-toggle-btn');
  audioButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      await soundscape.toggle();
    });
  });

  soundscape.subscribe((playing, title) => {
    audioButtons.forEach((btn) => {
      btn.classList.toggle('is-playing', playing);
      btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
      const label = btn.querySelector('.audio-label');
      if (label) {
        label.textContent = playing ? title : 'Música: Silencio';
      }
    });
  });

  // 3. Mobile Menu Toggle & Drawer
  function toggleMobileMenu(open) {
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

  // Close mobile drawer on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      toggleMobileMenu(false);
    }
  });

  // 4. Floating Chakra HUD Click Handler
  chakraDots.forEach((btn) => {
    btn.addEventListener('click', () => {
      const chakraId = btn.getAttribute('data-chakra');
      const targetChapter = document.getElementById(`centro-0${chakraId}`);
      if (targetChapter) {
        targetChapter.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 5. Active Section & Chakra Spy via IntersectionObserver
  const chapterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const chakraIndex = entry.target.getAttribute('data-chakra');
          
          // Update side HUD dots
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

  // 6. Desktop Main Nav Spy
  const mainSections = document.querySelectorAll('section[id]');
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
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

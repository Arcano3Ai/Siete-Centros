/**
 * SIETE CENTROS — Cinematic Parallax Engine
 * 60FPS silky smooth scroll effects using requestAnimationFrame
 * Coordinated 3D depth for centered video portals, sacred geometry, and progress.
 */

export function initParallax() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const progressBar = document.querySelector('.scroll-progress-bar');
  const portalStages = document.querySelectorAll('.cinematic-portal-stage');
  const heroContent = document.querySelector('.hero-content');
  const chakraImages = document.querySelectorAll('.chakra-image-wrapper .chakra-img');
  const sacredSymbols = document.querySelectorAll('.chakra-symbol-float svg');
  const allVideos = document.querySelectorAll('video');

  // Ensure all videos play continuously with maximum clarity
  allVideos.forEach((v) => {
    v.muted = true;
    v.play().catch(() => {});
  });

  let currentScrollY = window.scrollY;
  let targetScrollY = currentScrollY;
  let isTicking = false;

  function onScroll() {
    targetScrollY = window.scrollY;
    if (!isTicking) {
      requestAnimationFrame(updateParallax);
      isTicking = true;
    }
  }

  function updateParallax() {
    currentScrollY += (targetScrollY - currentScrollY) * 0.12;

    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight - winHeight;

    // 1. Progress Bar Update
    if (progressBar && docHeight > 0) {
      const progress = Math.min(100, Math.max(0, (targetScrollY / docHeight) * 100));
      progressBar.style.width = `${progress}%`;
    }

    if (!prefersReducedMotion) {
      // 2. Coordinated Centered Video Portals Parallax
      portalStages.forEach((stage) => {
        const rect = stage.getBoundingClientRect();
        if (rect.top < winHeight && rect.bottom > 0) {
          const centerOffset = (rect.top + rect.height / 2 - winHeight / 2) / winHeight;
          const translateY = centerOffset * 24; // Subtle 24px dimensional parallax
          const video = stage.querySelector('.portal-video');
          if (video) {
            video.style.transform = `translate3d(0, ${-centerOffset * 18}px, 0) scale(1.04)`;
          }
          stage.style.transform = `translate3d(0, ${translateY}px, 0)`;
        }
      });

      // 3. Hero Content Subtle Glide
      if (heroContent && currentScrollY < winHeight) {
        heroContent.style.transform = `translate3d(0, ${currentScrollY * 0.12}px, 0)`;
      }

      // 4. Chakra Images Subtle Vertical Parallax
      chakraImages.forEach((img) => {
        const rect = img.getBoundingClientRect();
        if (rect.top < winHeight && rect.bottom > 0) {
          const centerOffset = (rect.top + rect.height / 2 - winHeight / 2) / winHeight;
          const translateY = centerOffset * 22;
          img.style.transform = `translate3d(0, ${translateY}px, 0) scale(1.06)`;
        }
      });

      // 5. Sacred Symbols Continuous Dynamic Rotation by Scroll
      sacredSymbols.forEach((svg) => {
        const rot = (currentScrollY * 0.08) % 360;
        svg.style.transform = `rotate(${rot}deg)`;
      });
    }

    if (Math.abs(targetScrollY - currentScrollY) > 0.5) {
      requestAnimationFrame(updateParallax);
    } else {
      isTicking = false;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

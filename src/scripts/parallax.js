/**
 * SIETE CENTROS — Cinematic Parallax Engine
 * 60FPS silky smooth scroll effects using requestAnimationFrame
 * Drives the background video parallax layers with full visual clarity.
 */

export function initParallax() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const progressBar = document.querySelector('.scroll-progress-bar');
  const heroVideo = document.querySelector('.hero-video-bg');
  const chakrasVideo = document.querySelector('.chakras-video-bg');
  const sessionsVideo = document.querySelector('.sessions-video-bg');
  const finaleVideo = document.querySelector('.finale-video-bg');
  const heroContent = document.querySelector('.hero-content');
  const chakraImages = document.querySelectorAll('.chakra-image-wrapper .chakra-img');
  const sacredSymbols = document.querySelectorAll('.chakra-symbol-float svg');
  const allVideos = document.querySelectorAll('video');

  // Ensure all videos play continuously
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
      // 2. Hero Background Video Parallax
      if (heroVideo && currentScrollY < winHeight * 1.5) {
        const heroOffset = currentScrollY * 0.35;
        heroVideo.style.transform = `translate3d(0, ${heroOffset}px, 0) scale(1.08)`;
      }

      // 3. Hero Content Fade & Translate
      if (heroContent && currentScrollY < winHeight) {
        const heroRatio = Math.max(0, 1 - (currentScrollY / (winHeight * 0.85)));
        heroContent.style.opacity = Math.max(0.15, heroRatio).toFixed(3);
        heroContent.style.transform = `translate3d(0, ${currentScrollY * 0.18}px, 0)`;
      }

      // 4. Chakras Section Video Parallax
      if (chakrasVideo) {
        const rect = chakrasVideo.parentElement.getBoundingClientRect();
        if (rect.top < winHeight && rect.bottom > 0) {
          const centerOffset = (rect.top + rect.height / 2 - winHeight / 2) / winHeight;
          const translateY = centerOffset * 65;
          chakrasVideo.style.transform = `translate3d(0, ${translateY}px, 0) scale(1.08)`;
        }
      }

      // 5. Sessions Section Video Parallax
      if (sessionsVideo) {
        const rect = sessionsVideo.parentElement.getBoundingClientRect();
        if (rect.top < winHeight && rect.bottom > 0) {
          const centerOffset = (rect.top + rect.height / 2 - winHeight / 2) / winHeight;
          const translateY = centerOffset * 65;
          sessionsVideo.style.transform = `translate3d(0, ${translateY}px, 0) scale(1.08)`;
        }
      }

      // 6. Finale Section Video Parallax
      if (finaleVideo) {
        const rect = finaleVideo.parentElement.getBoundingClientRect();
        if (rect.top < winHeight && rect.bottom > 0) {
          const centerOffset = (rect.top + rect.height / 2 - winHeight / 2) / winHeight;
          const translateY = centerOffset * 65;
          finaleVideo.style.transform = `translate3d(0, ${translateY}px, 0) scale(1.08)`;
        }
      }

      // 7. Chakra Images Subtle Vertical Parallax
      chakraImages.forEach((img) => {
        const rect = img.getBoundingClientRect();
        if (rect.top < winHeight && rect.bottom > 0) {
          const centerOffset = (rect.top + rect.height / 2 - winHeight / 2) / winHeight;
          const translateY = centerOffset * 28;
          img.style.transform = `translate3d(0, ${translateY}px, 0) scale(1.08)`;
        }
      });

      // 8. Sacred Symbols Continuous Dynamic Rotation by Scroll
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

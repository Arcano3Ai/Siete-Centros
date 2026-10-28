/**
 * SIETE CENTROS — Master Frontend Application Controller
 */

import { initCosmicCanvas } from './particles.js';
import { initParallax } from './parallax.js';
import { initNavigation } from './navigation.js';
import { initModals } from './modals.js';
import { injectSacredGeometries } from './geometry.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject hand-crafted sacred geometry vectors
  injectSacredGeometries();

  // 2. Initialize cosmic dust canvas
  initCosmicCanvas();

  // 3. Initialize silky 60fps parallax engine & scroll tracking
  initParallax();

  // 4. Initialize navigation, audio engine trigger, and mobile drawer
  initNavigation();

  // 5. Initialize interactive modals, drawers, and agenda demos
  initModals();

  // 6. Reveal entrance
  document.body.classList.add('is-loaded');
});

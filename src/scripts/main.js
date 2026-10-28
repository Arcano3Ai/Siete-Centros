/**
 * SIETE CENTROS — Master Frontend Application Controller
 * Orchestrates 3-Column Triptych Layout, Sacred Geometry, Audio, & Modals
 */

import { initNavigation } from './navigation.js';
import { initModals } from './modals.js';
import { injectSacredGeometries } from './geometry.js';
import { initTriptych } from './triptych.js';
import { initDomI18n } from './i18n-dom.js';
import { mountInteractiveServices, mountTantricBot } from '../interactive-mount';

document.addEventListener('DOMContentLoaded', () => {
  // 0. Initialize bilingual internationalization (ES / EN)
  initDomI18n();
  // 1. Inject hand-crafted sacred geometry vectors
  injectSacredGeometries();

  // 2. Initialize 3-Column Triptych Layout (Orillas, 520px Centro, Partículas, CTA Magnético)
  initTriptych();

  // 3. Mount React Interactive Services Hub (Breathwork, Kriya, Tantra, Word Circle, Retreats)
  mountInteractiveServices();

  // 4. Mount Tantric Concierge Bot (Oráculo de los 7 Chakras)
  mountTantricBot();

  // 4. Initialize navigation & 432Hz ambient audio
  initNavigation();

  // 5. Initialize interactive modals (Sofía, Terapias, Círculo)
  initModals();

  // 6. Reveal entrance
  document.body.classList.add('is-loaded');
});


/**
 * SIETE CENTROS — Master Frontend Application Controller
 * Orchestrates 3-Column Triptych Layout, Sacred Geometry, Audio, & Modals
 */

import { initNavigation } from './navigation.js';
import { initModals } from './modals.js';
import { injectSacredGeometries } from './geometry.js';
import { initTriptych } from './triptych.js';
import { initDomI18n } from './i18n-dom.js';
import { mountInteractiveServices, mountTantricBot, mountBoutiqueStore } from '../interactive-mount';

function bootstrap() {
  // 0. Initialize bilingual internationalization (ES / EN)
  initDomI18n();
  // 1. Inject hand-crafted sacred geometry vectors
  injectSacredGeometries();

  // 2. Initialize 3-Column Triptych Layout (Orillas, 520px Centro, Partículas, CTA Magnético)
  initTriptych();

  // 3. Mount React Interactive Services Hub (Breathwork, Kriya, Tantra, Word Circle, Retreats)
  mountInteractiveServices();

  // 3b. Mount React Boutique Store (E-Commerce de Bienestar Íntimo & Carrito)
  mountBoutiqueStore();

  // 4. Mount Tantric Concierge Bot (Oráculo de los 7 Chakras)
  mountTantricBot();

  // 5. Initialize navigation & 432Hz ambient audio
  initNavigation();

  // 5b. Sync Top Nav Cart Button with Boutique Drawer
  const topCartBtn = document.getElementById('top-nav-cart-btn');
  if (topCartBtn) {
    topCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('siete_centros_open_cart'));
    });
  }

  // Update top nav cart badge when cart updates
  window.addEventListener('siete_centros_cart_updated', (e) => {
    const badge = document.getElementById('top-nav-cart-badge');
    if (badge && e.detail) {
      badge.textContent = e.detail.count || 0;
      badge.style.display = e.detail.count > 0 ? 'inline-flex' : 'none';
    }
  });

  // Init cart count on load
  try {
    const saved = localStorage.getItem('siete_centros_boutique_cart');
    if (saved) {
      const items = JSON.parse(saved);
      const total = items.reduce((sum, it) => sum + (it.quantity || 0), 0);
      const badge = document.getElementById('top-nav-cart-badge');
      if (badge) {
        badge.textContent = total;
        badge.style.display = total > 0 ? 'inline-flex' : 'none';
      }
    }
  } catch (err) {
    console.warn(err);
  }

  // 6. Initialize interactive modals
  initModals();

  // 7. Reveal entrance
  document.body.classList.add('is-loaded');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}



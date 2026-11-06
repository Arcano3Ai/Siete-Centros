/**
 * SIETE CENTROS — Client DOM Multilingual Translation Engine
 * Synchronizes HTML tags with data-i18n and dispatches language change events
 */

import { getStoredLanguage, setStoredLanguage } from '../i18n/translations';

const DOM_TRANSLATIONS = {
  es: {
    'nav-inicio': 'Inicio',
    'nav-siete-centros': 'Siete Centros',
    'nav-escuela': 'Escuela',
    'nav-tantra': 'Tantra',
    'nav-experiencias': 'Experiencias',
    'nav-boutique': 'Boutique',
    'nav-retiros': 'Retiros',
    'nav-contacto': 'Contacto',
    'nav-chakras': 'Chakras',
    'nav-breathwork': 'Breathwork',
    'nav-kriya': 'Kriya Yoga',
    'nav-circulos': 'Círculos',
    'nav-whatsapp': 'WhatsApp Sagrado',
    'hero-eyebrow': 'ESCUELA DE CONCIENCIA, TANTRA & BIENESTAR ÍNTIMO',
    'hero-subtitle': 'Un espacio para explorar el autoconocimiento, la conexión interior y el bienestar íntimo.',
    'hero-cta-circle': 'Explora la Escuela',
    'hero-cta-chakras': 'Explorar los 7 Centros',
    'flank-tagline': 'Santuario de Transformación Somática',
    'flank-lineage-role': 'Guías & Facilitadores Certificados',
    'flank-lineage-btn': 'Conocer Linaje',
    'chakra-7': 'Corona',
    'chakra-6': 'Tercer Ojo',
    'chakra-5': 'Garganta',
    'chakra-4': 'Corazón',
    'chakra-3': 'Plexo Solar',
    'chakra-2': 'Sacro',
    'chakra-1': 'Raíz',
    'oracle-btn-hint': 'Consultar al Oráculo'
  },
  en: {
    'nav-inicio': 'Home',
    'nav-siete-centros': 'Seven Centers',
    'nav-escuela': 'School',
    'nav-tantra': 'Tantra',
    'nav-experiencias': 'Experiences',
    'nav-boutique': 'Boutique',
    'nav-retiros': 'Retreats',
    'nav-contacto': 'Contact',
    'nav-chakras': 'Chakras',
    'nav-breathwork': 'Breathwork',
    'nav-kriya': 'Kriya Yoga',
    'nav-circulos': 'Circles',
    'nav-whatsapp': 'Sacred WhatsApp',
    'hero-eyebrow': 'SCHOOL OF CONSCIOUSNESS, TANTRA & INTIMATE WELLNESS',
    'hero-subtitle': 'A space to explore self-knowledge, inner connection, and intimate wellness.',
    'hero-cta-circle': 'Explore School',
    'hero-cta-chakras': 'Explore the 7 Centers',
    'flank-tagline': 'Sanctuary of Somatic Transformation',
    'flank-lineage-role': 'Certified Guides & Facilitators',
    'flank-lineage-btn': 'Discover Lineage',
    'chakra-7': 'Crown',
    'chakra-6': 'Third Eye',
    'chakra-5': 'Throat',
    'chakra-4': 'Heart',
    'chakra-3': 'Solar Plexus',
    'chakra-2': 'Sacral',
    'chakra-1': 'Root',
    'oracle-btn-hint': 'Ask the Oracle'
  }
};

export function initDomI18n() {
  let currentLang = getStoredLanguage();

  function applyLanguage(lang) {
    currentLang = lang;
    const dict = DOM_TRANSLATIONS[lang] || DOM_TRANSLATIONS.es;

    // Update DOM elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update Language Toggle buttons
    document.querySelectorAll('.lang-switcher-global-btn').forEach((btn) => {
      const esSpan = btn.querySelector('.lang-opt-es');
      const enSpan = btn.querySelector('.lang-opt-en');
      if (esSpan && enSpan) {
        esSpan.classList.toggle('active', lang === 'es');
        enSpan.classList.toggle('active', lang === 'en');
      }
    });

    document.documentElement.lang = lang;
  }

  // Attach click listener to any language toggle button
  document.querySelectorAll('.lang-switcher-global-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextLang = currentLang === 'es' ? 'en' : 'es';
      setStoredLanguage(nextLang);
      applyLanguage(nextLang);
    });
  });

  // Listen to custom event in case bot or another component toggles language
  window.addEventListener('siete-centros-lang-changed', (e) => {
    const newLang = e.detail?.lang;
    if (newLang && newLang !== currentLang) {
      applyLanguage(newLang);
    }
  });

  // Apply initial language
  applyLanguage(currentLang);
}

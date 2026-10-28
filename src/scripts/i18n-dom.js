/**
 * SIETE CENTROS — Client DOM Multilingual Translation Engine
 * Synchronizes HTML tags with data-i18n and dispatches language change events
 */

import { getStoredLanguage, setStoredLanguage } from '../i18n/translations';

const DOM_TRANSLATIONS = {
  es: {
    'nav-chakras': 'Chakras',
    'nav-breathwork': 'Breathwork',
    'nav-kriya': 'Kriya Yoga',
    'nav-tantra': 'Tantra',
    'nav-circulos': 'Círculos',
    'nav-retiros': 'Retiros 2026',
    'nav-sofia': 'Sofía',
    'nav-whatsapp': 'WhatsApp Sagrado',
    'hero-eyebrow': 'ESCUELA DE CONCIENCIA & RETIROS HOLÍSTICOS',
    'hero-subtitle': 'Un espacio de retorno al cuerpo, reintegración de los 7 centros energéticos y devoción por la vida viva.',
    'hero-cta-circle': 'Entrar al Círculo Sagrado',
    'hero-cta-chakras': 'Explorar los 7 Centros',
    'flank-tagline': 'Santuario de Transformación Somática',
    'flank-sofia-role': 'Guardiana & Guía Ceremonial',
    'flank-sofia-btn': 'Conocer a Sofía',
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
    'nav-chakras': 'Chakras',
    'nav-breathwork': 'Breathwork',
    'nav-kriya': 'Kriya Yoga',
    'nav-tantra': 'Tantra',
    'nav-circulos': 'Circles',
    'nav-retiros': 'Retreats 2026',
    'nav-sofia': 'Sofia',
    'nav-whatsapp': 'Sacred WhatsApp',
    'hero-eyebrow': 'SCHOOL OF CONSCIOUSNESS & HOLISTIC RETREATS',
    'hero-subtitle': 'A sanctuary to return to the body, reintegrate the 7 energy centers, and live in deep devotion to living life.',
    'hero-cta-circle': 'Enter Sacred Circle',
    'hero-cta-chakras': 'Explore the 7 Centers',
    'flank-tagline': 'Sanctuary of Somatic Transformation',
    'flank-sofia-role': 'Guardian & Ceremonial Guide',
    'flank-sofia-btn': 'Meet Sofia',
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

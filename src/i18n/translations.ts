export type Language = 'es' | 'en';

export interface Translations {
  nav: {
    home: string;
    breathwork: string;
    kriya: string;
    tantra: string;
    circulos: string;
    retiros: string;
    whatsappCta: string;
    langToggle: string;
  };
  hero: {
    tagline: string;
    subtitle: string;
    enterCircle: string;
    exploreChakras: string;
  };
  hub: {
    badge: string;
    title: string;
    desc: string;
    tabBreath: string;
    tabKriya: string;
    tabTantra: string;
    tabCircles: string;
    tabRetreats: string;
    openPageBtn: string;
  };
  breathwork: {
    title: string;
    subtitle: string;
    phaseInhale: string;
    phaseHold: string;
    phaseExhale: string;
    phaseHoldEmpty: string;
    phaseInhaleFull: string;
    phaseHoldFull: string;
    phaseExhaleFull: string;
    inhaleDesc: string;
    holdDesc: string;
    exhaleDesc: string;
    holdEmptyDesc: string;
    startBtn: string;
    pauseBtn: string;
    resetBtn: string;
    soundOn: string;
    soundOff: string;
    cycleCount: string;
    patternTrilogy: string;
    patternTrilogySub: string;
    patternBox: string;
    patternBoxSub: string;
    patternKriya: string;
    patternKriyaSub: string;
  };
  bot: {
    title: string;
    subtitle: string;
    badge: string;
    welcome: string;
    inputPlaceholder: string;
    send: string;
    whatsappDirect: string;
    openInWhatsApp: string;
    suggestionsTitle: string;
    chips: string[];
    disclaimer: string;
    hoverGreeting: string;
  };
}

export const DICTIONARY: Record<Language, Translations> = {
  es: {
    nav: {
      home: 'Inicio',
      breathwork: 'Breathwork',
      kriya: 'Kriya Yoga',
      tantra: 'Tantra',
      circulos: 'Círculos de Palabra',
      retiros: 'Retiros 2026',
      whatsappCta: 'WhatsApp Sagrado',
      langToggle: 'EN'
    },
    hero: {
      tagline: 'Escuela de Conciencia & Linaje Tántrico',
      subtitle: 'Un espacio de retorno al cuerpo, reintegración de los 7 centros energéticos y devoción por la vida viva.',
      enterCircle: 'Entrar al Círculo Sagrado',
      exploreChakras: 'Explorar los 7 Centros'
    },
    hub: {
      badge: 'EXPERIENCIAS INMERSIVAS',
      title: 'Portales de Transformación Consciente',
      desc: 'Herramientas vivas para afinar tu sistema nervioso, elevar tu energía vital y reconectar con la sabiduría no dual del cuerpo.',
      tabBreath: 'Breathwork',
      tabKriya: 'Kriya Yoga',
      tabTantra: 'Tantra',
      tabCircles: 'Círculos',
      tabRetreats: 'Retiros 2026',
      openPageBtn: 'Abrir Página Separada ↗'
    },
    breathwork: {
      title: 'Breathwork Somático',
      subtitle: 'Alquimia Respiratoria & Regulación Nerviosa',
      phaseInhale: 'INHALA',
      phaseHold: 'SOSTIENE',
      phaseExhale: 'EXHALA',
      phaseHoldEmpty: 'SOSTIENE EN VACÍO',
      phaseInhaleFull: '1. Inhala Profundo',
      phaseHoldFull: '2. Sostiene en Quietud',
      phaseExhaleFull: '3. Exhala y Suelta',
      inhaleDesc: 'Llena tus pulmones... expande el abdomen y corazón en 360°',
      holdDesc: 'Sostiene en quietud... habita el silencio quieto de tu templo interior',
      exhaleDesc: 'Exhala lento y suelta todo control... ríndete al sostén de la tierra',
      holdEmptyDesc: 'Descansa en el vacío fértil donde renace tu ser',
      startBtn: 'Iniciar Respiración',
      pauseBtn: 'Pausar',
      resetBtn: 'Reiniciar',
      soundOn: 'Cuenco Sagrado Activado',
      soundOff: 'Silenciado',
      cycleCount: 'Ciclos Completados',
      patternTrilogy: 'Trilogía Pránica (Inhala · Sostiene · Exhala)',
      patternTrilogySub: '4s Inhala · 4s Sostiene · 6s Exhala · Sistema Parasimpático',
      patternBox: 'Caja Pránica (Sama Vritti 4x4)',
      patternBoxSub: '4s Inhala · 4s Sostiene · 4s Exhala · 4s Vacío · Foco Mental',
      patternKriya: 'Kriya 4-7-8 Transmutación',
      patternKriyaSub: '4s Inhala · 7s Sostiene · 8s Exhala · Reposo Celular'
    },
    bot: {
      title: 'Oráculo Siete Centros',
      subtitle: 'Guía de Conciencia & Asistencia Sagrada',
      badge: 'EN LÍNEA',
      welcome: 'Namasté, ser luminoso. Soy el Oráculo de Siete Centros, presencia digital al servicio de la visión de Sofía. Puedo orientarte sobre nuestras prácticas somáticas, retiros 2026, linajes o facilitarte contacto directo. ¿Hacia qué centro energético te llama hoy tu pulso?',
      inputPlaceholder: 'Pregunta sobre Breathwork, Retiros, Tantra o WhatsApp...',
      send: 'Transmitir',
      whatsappDirect: 'Hablar con Sofía en WhatsApp',
      openInWhatsApp: 'Conectar por WhatsApp ↗',
      suggestionsTitle: 'Inspiración para consultar:',
      chips: [
        '¿Qué es el Breathwork Somático?',
        '¿Cuándo y dónde son los Retiros 2026?',
        '¿Cómo es una sesión de Tantra?',
        '¿En qué consiste el Kriya Yoga?',
        '¿Cómo participar en los Círculos de Palabra?',
        'Quiero agendar por WhatsApp con Sofía'
      ],
      disclaimer: 'Espacio de orientación holística. Para reservas privadas, contacta directamente a Sofía.',
      hoverGreeting: 'Namasté 🙏 Que tu respiración habite el presente. Pulsa para consultar al Oráculo'
    }
  },
  en: {
    nav: {
      home: 'Home',
      breathwork: 'Breathwork',
      kriya: 'Kriya Yoga',
      tantra: 'Tantra',
      circulos: 'Word Circles',
      retiros: 'Retreats 2026',
      whatsappCta: 'Sacred WhatsApp',
      langToggle: 'ES'
    },
    hero: {
      tagline: 'School of Consciousness & Tantric Lineage',
      subtitle: 'A sanctuary to return to the body, reintegrate the 7 energy centers, and live in deep reverence for living life.',
      enterCircle: 'Enter Sacred Circle',
      exploreChakras: 'Explore 7 Centers'
    },
    hub: {
      badge: 'IMMERSIVE EXPERIENCES',
      title: 'Portals of Conscious Transformation',
      desc: 'Living practices to calibrate your nervous system, awaken vital energy, and reconnect with the non-dual wisdom of your body.',
      tabBreath: 'Breathwork',
      tabKriya: 'Kriya Yoga',
      tabTantra: 'Tantra',
      tabCircles: 'Circles',
      tabRetreats: 'Retreats 2026',
      openPageBtn: 'Open Separate Page ↗'
    },
    breathwork: {
      title: 'Somatic Breathwork',
      subtitle: 'Respiratory Alchemy & Nervous System Regulation',
      phaseInhale: 'INHALE',
      phaseHold: 'HOLD',
      phaseExhale: 'EXHALE',
      phaseHoldEmpty: 'HOLD EMPTY',
      phaseInhaleFull: '1. Inhale Deeply',
      phaseHoldFull: '2. Hold in Stillness',
      phaseExhaleFull: '3. Exhale & Release',
      inhaleDesc: 'Fill your lungs fully... expand abdomen and heart in 360°',
      holdDesc: 'Hold in stillness... inhabit the quiet silence of your inner temple',
      exhaleDesc: 'Exhale slowly and surrender all control... trust the earth beneath you',
      holdEmptyDesc: 'Rest in the fertile stillness where your true essence is reborn',
      startBtn: 'Begin Breathing',
      pauseBtn: 'Pause',
      resetBtn: 'Reset',
      soundOn: 'Sacred Bowl Active',
      soundOff: 'Muted',
      cycleCount: 'Completed Cycles',
      patternTrilogy: 'Pranic Trilogy (Inhale · Hold · Exhale)',
      patternTrilogySub: '4s Inhale · 4s Hold · 6s Exhale · Parasympathetic Balance',
      patternBox: 'Pranic Box (Sama Vritti 4x4)',
      patternBoxSub: '4s Inhale · 4s Hold · 4s Exhale · 4s Void · Mental Clarity',
      patternKriya: 'Kriya 4-7-8 Transmutation',
      patternKriyaSub: '4s Inhale · 7s Hold · 8s Exhale · Cellular Rest'
    },
    bot: {
      title: 'Siete Centros Oracle',
      subtitle: 'Consciousness Guide & Sacred Concierge',
      badge: 'ONLINE',
      welcome: 'Namaste, luminous soul. I am the Siete Centros Oracle, a digital guardian serving Sofia\'s sacred vision. I can guide you through our somatic practices, 2026 retreats, ancient lineages, or connect you directly with Sofia. Which energy center calls you today?',
      inputPlaceholder: 'Ask about Breathwork, Retreats, Tantra, or WhatsApp...',
      send: 'Send',
      whatsappDirect: 'Chat with Sofia on WhatsApp',
      openInWhatsApp: 'Connect via WhatsApp ↗',
      suggestionsTitle: 'Inspiration to ask:',
      chips: [
        'What is Somatic Breathwork?',
        'When and where are the 2026 Retreats?',
        'What happens in a Tantra session?',
        'What is Kriya Yoga?',
        'How to join the Word Circles?',
        'I want to book via WhatsApp with Sofia'
      ],
      disclaimer: 'Holistic guidance space. For private bookings, contact Sofia directly.',
      hoverGreeting: 'Namaste 🙏 May your breath inhabit the present. Click to consult the Oracle'
    }
  }
};

const LANG_KEY = 'siete_centros_lang';

export function getStoredLanguage(): Language {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'en' || saved === 'es') return saved;
  } catch {
    // LocalStorage fallback
  }
  return 'es';
}

export function setStoredLanguage(lang: Language): void {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    // LocalStorage fallback
  }
  window.dispatchEvent(new CustomEvent('siete-centros-lang-changed', { detail: { lang } }));
}

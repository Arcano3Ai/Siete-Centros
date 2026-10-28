/**
 * SIETE CENTROS — Sacred Geometry SVG Definitions
 * Handcrafted minimalist vector geometry representing each of the 7 centers
 */

export const SACRED_GEOMETRY = {
  // Centro 01: Muladhara (Raíz) — Square & 4 Petals
  1: `
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="50" cy="50" r="44" stroke="rgba(184, 34, 52, 0.4)" stroke-dasharray="2 4"/>
      <rect x="28" y="28" width="44" height="44" rx="2" stroke="var(--c1-base)"/>
      <polygon points="50,22 78,50 50,78 22,50" stroke="var(--gold-aged)" stroke-width="1.2"/>
      <circle cx="50" cy="50" r="12" stroke="var(--c1-base)" stroke-width="1.5"/>
      <circle cx="50" cy="50" r="3" fill="var(--c1-base)"/>
      <!-- 4 cardinal markers -->
      <line x1="50" y1="12" x2="50" y2="22" stroke="var(--gold-bright)"/>
      <line x1="50" y1="78" x2="50" y2="88" stroke="var(--gold-bright)"/>
      <line x1="12" y1="50" x2="22" y2="50" stroke="var(--gold-bright)"/>
      <line x1="78" y1="50" x2="88" y2="50" stroke="var(--gold-bright)"/>
    </svg>
  `,

  // Centro 02: Svadhisthana (Sacro) — Crescent Moon & 6 Petals
  2: `
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="50" cy="50" r="44" stroke="rgba(224, 122, 43, 0.35)"/>
      <path d="M 32 30 A 24 24 0 1 0 32 70 A 28 28 0 0 1 32 30 Z" stroke="var(--c2-base)" stroke-width="1.4" fill="rgba(224, 122, 43, 0.1)"/>
      <circle cx="50" cy="50" r="34" stroke="var(--gold-aged)" stroke-dasharray="3 3"/>
      <circle cx="50" cy="50" r="4" fill="var(--c2-base)"/>
      <path d="M 50 16 L 50 84 M 16 50 L 84 50" stroke="rgba(223, 190, 144, 0.25)" stroke-width="0.8"/>
    </svg>
  `,

  // Centro 03: Manipura (Poder) — Inverted Solar Triangle & Radiant Rays
  3: `
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="50" cy="50" r="44" stroke="rgba(229, 169, 26, 0.4)"/>
      <polygon points="50,76 24,28 76,28" stroke="var(--c3-base)" stroke-width="1.6"/>
      <circle cx="50" cy="50" r="16" stroke="var(--gold-bright)" stroke-width="1.2"/>
      <circle cx="50" cy="50" r="3" fill="var(--gold-bright)"/>
      <!-- 10 subtle sun ticks -->
      <g stroke="var(--gold-aged)" stroke-width="1.2">
        <line x1="50" y1="8" x2="50" y2="15"/>
        <line x1="75" y1="16" x2="70" y2="22"/>
        <line x1="90" y1="38" x2="83" y2="40"/>
        <line x1="90" y1="62" x2="83" y2="60"/>
        <line x1="75" y1="84" x2="70" y2="78"/>
        <line x1="25" y1="84" x2="30" y2="78"/>
        <line x1="10" y1="62" x2="17" y2="60"/>
        <line x1="10" y1="38" x2="17" y2="40"/>
        <line x1="25" y1="16" x2="30" y2="22"/>
      </g>
    </svg>
  `,

  // Centro 04: Anahata (Corazón) — 12-Petal Hexagram (Star of Consciousness)
  4: `
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="50" cy="50" r="44" stroke="rgba(30, 142, 98, 0.35)"/>
      <!-- Interlocking Triangles (Sacred Union) -->
      <polygon points="50,22 75,65 25,65" stroke="var(--c4-base)" stroke-width="1.5"/>
      <polygon points="50,78 25,35 75,35" stroke="var(--gold-bright)" stroke-width="1.5"/>
      <circle cx="50" cy="50" r="14" stroke="var(--c4-base)" stroke-dasharray="2 3"/>
      <circle cx="50" cy="50" r="3.5" fill="var(--c4-base)"/>
    </svg>
  `,

  // Centro 05: Vishuddha (Voz) — Harmonic Sound Rings & Inverted Triangle
  5: `
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="50" cy="50" r="44" stroke="rgba(31, 162, 196, 0.4)"/>
      <circle cx="50" cy="50" r="34" stroke="var(--gold-aged)" stroke-dasharray="4 2"/>
      <circle cx="50" cy="50" r="22" stroke="var(--c5-base)" stroke-width="1.4"/>
      <polygon points="50,68 32,36 68,36" stroke="var(--c5-base)" stroke-width="1.4"/>
      <circle cx="50" cy="46" r="4" fill="var(--c5-base)"/>
      <!-- Acoustic ripple waves -->
      <path d="M 20 50 Q 50 35 80 50" stroke="rgba(31, 162, 196, 0.5)" stroke-width="0.8"/>
      <path d="M 20 50 Q 50 65 80 50" stroke="rgba(31, 162, 196, 0.5)" stroke-width="0.8"/>
    </svg>
  `,

  // Centro 06: Ajna (Visión) — Third Eye Winged Lotus & Portal
  6: `
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5">
      <!-- 2 Winged Petals -->
      <path d="M 50 50 C 35 30 10 35 8 50 C 10 65 35 70 50 50" stroke="var(--c6-base)" stroke-width="1.4"/>
      <path d="M 50 50 C 65 30 90 35 92 50 C 90 65 65 70 50 50" stroke="var(--c6-base)" stroke-width="1.4"/>
      <circle cx="50" cy="50" r="22" stroke="var(--gold-aged)" stroke-width="1.2"/>
      <polygon points="50,65 37,42 63,42" stroke="var(--c6-base)" stroke-width="1.5"/>
      <circle cx="50" cy="50" r="4" fill="var(--gold-bright)"/>
    </svg>
  `,

  // Centro 07: Sahasrara (Conciencia) — Thousand Petal Lotus Mandala
  7: `
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="50" cy="50" r="46" stroke="rgba(168, 85, 247, 0.45)" stroke-dasharray="2 3"/>
      <circle cx="50" cy="50" r="38" stroke="var(--gold-bright)" stroke-width="1"/>
      <circle cx="50" cy="50" r="28" stroke="var(--c7-base)" stroke-width="1.2"/>
      <circle cx="50" cy="50" r="18" stroke="var(--gold-aged)" stroke-dasharray="3 3"/>
      <!-- Radiating petals mandala -->
      <g stroke="var(--c7-base)" stroke-width="1">
        <path d="M 50 12 C 55 24 55 24 50 32 C 45 24 45 24 50 12 Z"/>
        <path d="M 50 88 C 55 76 55 76 50 68 C 45 76 45 76 50 88 Z"/>
        <path d="M 12 50 C 24 55 24 55 32 50 C 24 45 24 45 12 50 Z"/>
        <path d="M 88 50 C 76 55 76 55 68 50 C 76 45 76 45 88 50 Z"/>
      </g>
      <circle cx="50" cy="50" r="5" fill="var(--gold-bright)"/>
    </svg>
  `
};

export function injectSacredGeometries() {
  document.querySelectorAll('.chakra-symbol-float').forEach((el) => {
    const chakraNum = el.getAttribute('data-chakra');
    if (chakraNum && SACRED_GEOMETRY[chakraNum]) {
      el.innerHTML = SACRED_GEOMETRY[chakraNum];
    }
  });
}

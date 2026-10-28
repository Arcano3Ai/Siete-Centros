import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Wind, CheckCircle2, User, CircleDot } from 'lucide-react';
import { getStoredLanguage, DICTIONARY, Language } from '../../i18n/translations';

export type BreathPattern = 'trilogy' | 'box' | 'kriya';
export type BreathPhase = 'Inhala' | 'Sostiene' | 'Exhala' | 'Vacío';
export type VisualMode = 'yogi' | 'torus';

interface PatternConfig {
  id: BreathPattern;
  name: { es: string; en: string };
  sub: { es: string; en: string };
  inhale: number;
  holdIn: number;
  exhale: number;
  holdOut?: number;
  color: string;
  glowColor: string;
  description: { es: string; en: string };
  targetHz: string;
}

const PATTERNS: Record<BreathPattern, PatternConfig> = {
  trilogy: {
    id: 'trilogy',
    name: {
      es: 'Trilogía Pránica (Inhala · Sostiene · Exhala)',
      en: 'Pranic Trilogy (Inhale · Hold · Exhale)'
    },
    sub: {
      es: '4s Inhala · 4s Sostiene · 6s Exhala · Parasimpático Profundo',
      en: '4s Inhale · 4s Hold · 6s Exhale · Deep Parasympathetic Tone'
    },
    inhale: 4,
    holdIn: 4,
    exhale: 6,
    color: '#DFBE90', // Sacred Gold
    glowColor: 'rgba(223, 190, 144, 0.45)',
    description: {
      es: 'La secuencia fundamental de regulación somática: oxigena tejidos, sostiene la atención en presencia quieta y prolonga la exhalación para activar el nervio vago y disolver la sobrecarga nerviosa.',
      en: 'The core somatic sequence: deeply oxygenates tissues, holds pure awareness in stillness, and elongates the exhale to stimulate the vagus nerve and clear stress.'
    },
    targetHz: '0.1 Hz Resonancia Cardíaca'
  },
  box: {
    id: 'box',
    name: {
      es: 'Caja Pránica (Sama Vritti 4x4)',
      en: 'Pranic Box (Sama Vritti 4x4)'
    },
    sub: {
      es: '4s Inhala · 4s Sostiene · 4s Exhala · 4s Vacío · Foco Mental',
      en: '4s Inhale · 4s Hold · 4s Exhale · 4s Void · Sovereign Focus'
    },
    inhale: 4,
    holdIn: 4,
    exhale: 4,
    holdOut: 4,
    color: '#34D399', // Anahata Green
    glowColor: 'rgba(52, 211, 153, 0.4)',
    description: {
      es: 'Arquitectura pránica cuádruple de los antiguos yoguis. Equilibra simétricamente ambos hemisferios cerebrales y restaura el control soberano sobre la mente.',
      en: 'Symmetrical 4-part pranayama of ancient yogis. Balances both brain hemispheres and anchors the mind in unwavering equanimity.'
    },
    targetHz: 'Ondas Alfa 10 Hz'
  },
  kriya: {
    id: 'kriya',
    name: {
      es: 'Kriya 4-7-8 Transmutación',
      en: 'Kriya 4-7-8 Transmutation'
    },
    sub: {
      es: '4s Inhala · 7s Sostiene · 8s Exhala · Reposo Celular',
      en: '4s Inhale · 7s Hold · 8s Exhale · Cellular Rest'
    },
    inhale: 4,
    holdIn: 7,
    exhale: 8,
    color: '#C084FC', // Sahasrara Violet
    glowColor: 'rgba(192, 132, 252, 0.45)',
    description: {
      es: 'Viaje respiratorio de transmutación tántrica. La retención prolongada permite la absorción del prana sutil y la exhalación lenta induce relajación somática absoluta.',
      en: 'Tantric transmutation practice. Extended retention facilitates subtle prana absorption while elongated exhalation unlocks profound rest.'
    },
    targetHz: 'Ondas Theta 5 Hz'
  }
};

interface ChakraNode {
  id: number;
  name: { es: string; en: string };
  sanskrit: string;
  color: string;
  y: number;
  freq: string;
}

const CHAKRA_NODES: ChakraNode[] = [
  { id: 7, name: { es: 'Corona', en: 'Crown' }, sanskrit: 'Sahasrara', color: '#C084FC', y: 52, freq: '963 Hz' },
  { id: 6, name: { es: 'Tercer Ojo', en: 'Third Eye' }, sanskrit: 'Ajna', color: '#818CF8', y: 88, freq: '852 Hz' },
  { id: 5, name: { es: 'Garganta', en: 'Throat' }, sanskrit: 'Vishuddha', color: '#38BDF8', y: 125, freq: '741 Hz' },
  { id: 4, name: { es: 'Corazón', en: 'Heart' }, sanskrit: 'Anahata', color: '#34D399', y: 168, freq: '639 Hz' },
  { id: 3, name: { es: 'Plexo Solar', en: 'Solar Plexus' }, sanskrit: 'Manipura', color: '#FBBF24', y: 212, freq: '528 Hz' },
  { id: 2, name: { es: 'Sacro', en: 'Sacral' }, sanskrit: 'Svadhisthana', color: '#FB923C', y: 252, freq: '417 Hz' },
  { id: 1, name: { es: 'Raíz', en: 'Root' }, sanskrit: 'Muladhara', color: '#F43F5E', y: 292, freq: '396 Hz' }
];

export const BreathworkOrbe: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<BreathPattern>('trilogy');
  const [visualMode, setVisualMode] = useState<VisualMode>('yogi');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [phase, setPhase] = useState<BreathPhase>('Inhala');
  const [phaseProgress, setPhaseProgress] = useState<number>(0); // 0 to 1 smooth
  const [secondsLeft, setSecondsLeft] = useState<number>(4);
  const [completedCycles, setCompletedCycles] = useState<number>(0);
  const [currentLang, setCurrentLang] = useState<Language>(getStoredLanguage());
  const [hoveredChakra, setHoveredChakra] = useState<ChakraNode | null>(null);

  const pattern = PATTERNS[selectedPattern];
  const t = DICTIONARY[currentLang];

  // Global language synchronization
  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ lang: Language }>;
      if (customEvent.detail?.lang) {
        setCurrentLang(customEvent.detail.lang);
      }
    };
    window.addEventListener('siete-centros-lang-changed', handleLangChange);
    return () => window.removeEventListener('siete-centros-lang-changed', handleLangChange);
  }, []);

  // Web Audio Context for Procedural Tibetan Singing Bowl
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSingingBowl = useCallback((frequency: number = 432) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      // Primary Oscillator (Fundamental)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(frequency, now);

      // Harmonic Oscillator (Harmonic shimmer)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(frequency * 1.5, now);

      // Envelopes
      gain1.gain.setValueAtTime(0.0001, now);
      gain1.gain.exponentialRampToValueAtTime(0.18, now + 0.08);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      gain2.gain.setValueAtTime(0.0001, now);
      gain2.gain.exponentialRampToValueAtTime(0.06, now + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 3.0);
      osc2.stop(now + 2.2);
    } catch {
      // Gracefully silent if audio context restricted
    }
  }, [soundEnabled]);

  const animRef = useRef<number | null>(null);
  const phaseStartTimeRef = useRef<number>(0);
  const currentPhaseDurationRef = useRef<number>(pattern.inhale);

  const getDurationForPhase = useCallback((p: BreathPhase, cfg: PatternConfig): number => {
    switch (p) {
      case 'Inhala': return cfg.inhale;
      case 'Sostiene': return cfg.holdIn;
      case 'Exhala': return cfg.exhale;
      case 'Vacío': return cfg.holdOut || 4;
    }
  }, []);

  const getNextPhase = useCallback((currentP: BreathPhase, cfg: PatternConfig): { nextPhase: BreathPhase; completed: boolean } => {
    if (cfg.id === 'trilogy') {
      if (currentP === 'Inhala') return { nextPhase: 'Sostiene', completed: false };
      if (currentP === 'Sostiene') return { nextPhase: 'Exhala', completed: false };
      return { nextPhase: 'Inhala', completed: true };
    }
    if (cfg.id === 'box') {
      if (currentP === 'Inhala') return { nextPhase: 'Sostiene', completed: false };
      if (currentP === 'Sostiene') return { nextPhase: 'Exhala', completed: false };
      if (currentP === 'Exhala') return { nextPhase: 'Vacío', completed: false };
      return { nextPhase: 'Inhala', completed: true };
    }
    // kriya (4-7-8)
    if (currentP === 'Inhala') return { nextPhase: 'Sostiene', completed: false };
    if (currentP === 'Sostiene') return { nextPhase: 'Exhala', completed: false };
    return { nextPhase: 'Inhala', completed: true };
  }, []);

  useEffect(() => {
    if (!isActive) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      setPhaseProgress(0);
      return;
    }

    phaseStartTimeRef.current = performance.now();
    currentPhaseDurationRef.current = getDurationForPhase(phase, pattern);

    const tick = (now: number) => {
      const elapsed = (now - phaseStartTimeRef.current) / 1000;
      const duration = currentPhaseDurationRef.current;
      const rawProgress = Math.min(1, elapsed / duration);
      setPhaseProgress(rawProgress);

      const remaining = Math.max(0, duration - elapsed);
      setSecondsLeft(remaining);

      if (elapsed >= duration) {
        // Phase Transition
        const { nextPhase, completed } = getNextPhase(phase, pattern);
        if (completed) {
          setCompletedCycles((c) => c + 1);
        }

        // Play singing bowl sound on phase shift
        if (nextPhase === 'Inhala') playSingingBowl(432);
        else if (nextPhase === 'Sostiene') playSingingBowl(528); // 528Hz Transformation
        else if (nextPhase === 'Exhala') playSingingBowl(396); // 396Hz Release
        else playSingingBowl(285);

        setPhase(nextPhase);
        phaseStartTimeRef.current = now;
        currentPhaseDurationRef.current = getDurationForPhase(nextPhase, pattern);
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isActive, phase, pattern, getDurationForPhase, getNextPhase, playSingingBowl]);

  const handleToggle = () => {
    if (!isActive) {
      setPhase('Inhala');
      currentPhaseDurationRef.current = pattern.inhale;
      phaseStartTimeRef.current = performance.now();
      setSecondsLeft(pattern.inhale);
      playSingingBowl(432);
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('Inhala');
    setPhaseProgress(0);
    setSecondsLeft(pattern.inhale);
    setCompletedCycles(0);
  };

  // Organic smooth scaling and glowing dynamics
  let dynamicScale = 1;
  let haloOpacity = 0.3;
  let pranaParticleY = 292; // 292 is Root, 52 is Crown

  if (!isActive) {
    dynamicScale = 1;
    haloOpacity = 0.25;
    pranaParticleY = 292;
  } else if (phase === 'Inhala') {
    // Prana ascends from Root (292) to Crown (52)
    const eased = Math.sin((phaseProgress * Math.PI) / 2);
    dynamicScale = 1.0 + eased * 0.45;
    haloOpacity = 0.25 + eased * 0.65;
    pranaParticleY = 292 - eased * 240;
  } else if (phase === 'Sostiene') {
    // Sostiene: Pulsating at crown & heart, steady alive glow
    const heartbeat = Math.sin(phaseProgress * Math.PI * 4) * 0.035;
    dynamicScale = 1.45 + heartbeat;
    haloOpacity = 0.9;
    pranaParticleY = 52; // Crown hold
  } else if (phase === 'Exhala') {
    // Gentle release from Crown (52) down to Root (292)
    const eased = Math.sin((phaseProgress * Math.PI) / 2);
    dynamicScale = 1.45 - eased * 0.45;
    haloOpacity = 0.9 - eased * 0.65;
    pranaParticleY = 52 + eased * 240;
  } else {
    // Vacío
    dynamicScale = 1.0;
    haloOpacity = 0.25;
    pranaParticleY = 292;
  }

  // SVG Circular progress stroke calculations
  const strokeDashoffset = 283 - 283 * phaseProgress;

  const getPhaseTitle = (p: BreathPhase) => {
    switch (p) {
      case 'Inhala': return t.breathwork.phaseInhale;
      case 'Sostiene': return t.breathwork.phaseHold;
      case 'Exhala': return t.breathwork.phaseExhale;
      case 'Vacío': return t.breathwork.phaseHoldEmpty;
    }
  };

  const getPhaseInstruction = (p: BreathPhase) => {
    switch (p) {
      case 'Inhala': return t.breathwork.inhaleDesc;
      case 'Sostiene': return t.breathwork.holdDesc;
      case 'Exhala': return t.breathwork.exhaleDesc;
      case 'Vacío': return t.breathwork.holdEmptyDesc;
    }
  };

  const stepsList: BreathPhase[] = selectedPattern === 'box'
    ? ['Inhala', 'Sostiene', 'Exhala', 'Vacío']
    : ['Inhala', 'Sostiene', 'Exhala'];

  return (
    <div className="breathwork-container">
      {/* Selector de Patrones Pránicos y Modo de Visualización */}
      <div className="breathwork-top-toolbar">
        <div className="breathwork-pattern-tabs">
          {(Object.keys(PATTERNS) as BreathPattern[]).map((key) => {
            const p = PATTERNS[key];
            const isSelected = selectedPattern === key;
            return (
              <button
                key={key}
                type="button"
                className={`breathwork-tab-btn ${isSelected ? 'active' : ''}`}
                style={{
                  borderColor: isSelected ? p.color : 'rgba(197, 168, 128, 0.18)',
                  color: isSelected ? '#FAF7F2' : 'rgba(250, 247, 242, 0.65)',
                  boxShadow: isSelected ? `0 0 20px ${p.glowColor}` : 'none'
                }}
                onClick={() => {
                  setSelectedPattern(key);
                  setIsActive(false);
                  setPhase('Inhala');
                  setPhaseProgress(0);
                  setSecondsLeft(PATTERNS[key].inhale);
                }}
              >
                <span className="tab-dot" style={{ backgroundColor: p.color, boxShadow: `0 0 8px ${p.color}` }} />
                <span>{p.name[currentLang]}</span>
              </button>
            );
          })}
        </div>

        {/* Visual Switcher: Yogi / Torus */}
        <div className="breathwork-view-switch">
          <button
            type="button"
            className={`view-switch-btn ${visualMode === 'yogi' ? 'active' : ''}`}
            onClick={() => setVisualMode('yogi')}
            title={currentLang === 'es' ? 'Ver Cuerpo Yóguico & 7 Chakras' : 'View Yogic Body & 7 Chakras'}
          >
            <User size={13} />
            <span>{currentLang === 'es' ? 'Cuerpo Yóguico' : 'Yogic Body'}</span>
          </button>
          <button
            type="button"
            className={`view-switch-btn ${visualMode === 'torus' ? 'active' : ''}`}
            onClick={() => setVisualMode('torus')}
            title={currentLang === 'es' ? 'Ver Geometría Sagrada & Torus' : 'View Sacred Torus'}
          >
            <CircleDot size={13} />
            <span>{currentLang === 'es' ? 'Geometría Torus' : 'Sacred Torus'}</span>
          </button>
        </div>
      </div>

      <div className="breathwork-pattern-meta">
        <span className="meta-sub">{pattern.sub[currentLang]}</span>
        <span className="meta-hz" style={{ color: pattern.color }}>
          <Sparkles size={11} /> {pattern.targetHz}
        </span>
      </div>

      {/* PIPELINE DE PASOS CLARO: 1. INHALA -> 2. SOSTIENE -> 3. EXHALA */}
      <div className="breathwork-phases-pipeline" aria-label="Fases del ciclo respiratorio">
        {stepsList.map((stepKey, idx) => {
          const isCurrent = isActive && phase === stepKey;
          return (
            <div
              key={stepKey}
              className={`pipeline-step-node ${isCurrent ? 'active' : ''}`}
              style={{
                borderColor: isCurrent ? pattern.color : 'rgba(197, 168, 128, 0.16)',
                backgroundColor: isCurrent ? 'rgba(223, 190, 144, 0.12)' : 'rgba(10, 10, 14, 0.6)',
                boxShadow: isCurrent ? `0 0 16px ${pattern.glowColor}` : 'none'
              }}
            >
              <span className="pipeline-step-num" style={{ color: isCurrent ? pattern.color : 'rgba(197, 168, 128, 0.5)' }}>
                0{idx + 1}
              </span>
              <span className="pipeline-step-name" style={{ color: isCurrent ? '#FAF7F2' : 'rgba(250, 247, 242, 0.6)' }}>
                {getPhaseTitle(stepKey)}
              </span>
              {isCurrent && <span className="pipeline-step-live-dot" style={{ backgroundColor: pattern.color }} />}
            </div>
          );
        })}
      </div>

      {/* ====================================================================
          ESCENARIO CENTRAL: CUERPO YÓGUICO & 7 CHAKRAS O GEOMETRÍA SAGRADA
          ==================================================================== */}
      <div className="breathwork-stage" aria-label="Orbe de respiración interactivo">
        {/* Ripples Pránicos de Expansión en 360° */}
        <div
          className="prana-ripple prana-ripple-1"
          style={{
            transform: `scale(${dynamicScale * 1.3})`,
            borderColor: pattern.color,
            opacity: haloOpacity * 0.4
          }}
        />

        <div
          className="prana-ripple prana-ripple-2"
          style={{
            transform: `scale(${dynamicScale * 1.15})`,
            borderColor: pattern.color,
            opacity: haloOpacity * 0.6
          }}
        />

        {/* Halo de Resplandor Místico */}
        <div
          className="breathwork-orbe-glow-halo"
          style={{
            transform: `scale(${dynamicScale * 1.1})`,
            background: `radial-gradient(circle, ${pattern.glowColor} 0%, ${pattern.color}18 45%, transparent 75%)`,
            opacity: haloOpacity
          }}
        />

        {/* Anillo Circular SVG con Progreso Fluido */}
        <svg className="breathwork-circular-ring" viewBox="0 0 100 100" aria-hidden="true">
          <circle
            className="ring-bg"
            cx="50"
            cy="50"
            r="46"
            stroke="rgba(197, 168, 128, 0.12)"
            strokeWidth="1.8"
            fill="none"
          />
          <circle
            className="ring-progress"
            cx="50"
            cy="50"
            r="46"
            stroke={pattern.color}
            strokeWidth="2.8"
            fill="none"
            strokeDasharray="289"
            strokeDashoffset={289 - 289 * phaseProgress}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 10px ${pattern.color})`
            }}
          />
        </svg>

        {/* NÚCLEO DINÁMICO: MODO YOGUI CON LOS 7 CHAKRAS */}
        {visualMode === 'yogi' ? (
          <div
            className="breathwork-yogi-viewport"
            style={{
              transform: `scale(${0.92 + (dynamicScale - 1) * 0.3})`
            }}
          >
            {/* SVG del Yogui en Flor de Loto con los 7 Chakras */}
            <svg viewBox="0 0 320 340" className="yogi-sacred-silhouette-svg" fill="none">
              <defs>
                <linearGradient id="bodyGlass" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#DFBE90" stopOpacity="0.22" />
                  <stop offset="60%" stopColor="#140D20" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#08060C" stopOpacity="0.95" />
                </linearGradient>
                <radialGradient id="torusField" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#DFBE90" stopOpacity="0.35" />
                  <stop offset="50%" stopColor="#C084FC" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* Campo Toroidal Áurico detrás del Yogui */}
              <ellipse
                cx="160"
                cy="170"
                rx={110 * (0.85 + (dynamicScale - 1) * 0.5)}
                ry={135 * (0.85 + (dynamicScale - 1) * 0.5)}
                fill="url(#torusField)"
                stroke="rgba(223, 190, 144, 0.2)"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity={haloOpacity}
              />

              {/* Loto Sagrado de Corona (Sahasrara) Expandido en Retención */}
              <g className={`crown-lotus-aura ${phase === 'Sostiene' ? 'pulsing-crown' : ''}`} opacity={phase === 'Sostiene' ? 0.95 : 0.4}>
                <circle cx="160" cy="52" r="28" stroke="#C084FC" strokeWidth="0.9" strokeDasharray="3 3" />
                <circle cx="160" cy="52" r="38" stroke="#DFBE90" strokeWidth="0.8" strokeDasharray="2 4" />
                <path d="M 160 14 L 164 26 L 160 22 L 156 26 Z" fill="#C084FC" />
                <path d="M 160 90 L 164 78 L 160 82 L 156 78 Z" fill="#C084FC" />
                <path d="M 122 52 L 134 56 L 130 52 L 134 48 Z" fill="#C084FC" />
                <path d="M 198 52 L 186 56 L 190 52 L 186 48 Z" fill="#C084FC" />
              </g>

              {/* Silueta Anatómica Meditativa en Padmasana (Flor de Loto) */}
              <path
                d="M 160 42
                   C 176 42, 185 54, 185 68
                   C 185 78, 178 88, 172 94
                   C 188 102, 212 110, 224 135
                   C 234 155, 238 185, 240 215
                   C 242 245, 244 268, 252 285
                   C 258 298, 268 305, 276 312
                   C 264 322, 238 325, 210 322
                   C 188 320, 174 316, 160 316
                   C 146 316, 132 320, 110 322
                   C 82 325, 56 322, 44 312
                   C 52 305, 62 298, 68 285
                   C 76 268, 78 245, 80 215
                   C 82 185, 86 155, 96 135
                   C 108 110, 132 102, 148 94
                   C 142 88, 135 78, 135 68
                   C 135 54, 144 42, 160 42 Z"
                fill="url(#bodyGlass)"
                stroke="rgba(223, 190, 144, 0.45)"
                strokeWidth="1.5"
                filter="drop-shadow(0 0 12px rgba(223, 190, 144, 0.2))"
              />

              {/* Brazos descansando sobre las rodillas en Gyan Mudra */}
              <path
                d="M 104 140 C 90 185, 76 230, 68 280 C 72 292, 88 296, 106 294"
                stroke="rgba(223, 190, 144, 0.3)"
                strokeWidth="1.2"
                fill="none"
              />
              <path
                d="M 216 140 C 230 185, 244 230, 252 280 C 248 292, 232 296, 214 294"
                stroke="rgba(223, 190, 144, 0.3)"
                strokeWidth="1.2"
                fill="none"
              />

              {/* Eje de la Columna Sushumna Nadi */}
              <line x1="160" y1="292" x2="160" y2="52" stroke="rgba(223, 190, 144, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Corrientes de Prana Ascendente / Descendente en la Columna */}
              {isActive && (
                <circle
                  cx="160"
                  cy={pranaParticleY}
                  r="7"
                  fill="#FFFFFF"
                  style={{
                    filter: `drop-shadow(0 0 14px ${pattern.color})`
                  }}
                />
              )}

              {/* Los 7 Chakras Alineados a lo largo de Sushumna */}
              {CHAKRA_NODES.map((ch) => {
                const isHovered = hoveredChakra?.id === ch.id;
                // Determine brightness based on prana closeness
                const distToPrana = Math.abs(pranaParticleY - ch.y);
                const isLit = isActive && (phase === 'Sostiene' || distToPrana < 28);

                return (
                  <g
                    key={ch.id}
                    className="yogi-chakra-node-group"
                    onMouseEnter={() => setHoveredChakra(ch)}
                    onMouseLeave={() => setHoveredChakra(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Aura Exterior del Chakra */}
                    <circle
                      cx="160"
                      cy={ch.y}
                      r={isLit ? 16 : isHovered ? 14 : 10}
                      fill={ch.color}
                      fillOpacity={isLit ? 0.35 : 0.15}
                      stroke={ch.color}
                      strokeWidth={isLit ? 2 : 1}
                      style={{
                        transition: 'all 0.3s ease',
                        filter: isLit ? `drop-shadow(0 0 10px ${ch.color})` : 'none'
                      }}
                    />

                    {/* Centro Núcleo del Chakra */}
                    <circle
                      cx="160"
                      cy={ch.y}
                      r={isLit ? 5.5 : 4}
                      fill={isLit ? '#FFFFFF' : ch.color}
                      style={{
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Tooltip Flotante de Chakra al pasar el cursor */}
            {hoveredChakra && (
              <div
                className="yogi-chakra-hover-card"
                style={{
                  borderColor: hoveredChakra.color,
                  boxShadow: `0 0 16px ${hoveredChakra.color}44`
                }}
              >
                <span className="card-chakra-num">CHAKRA {hoveredChakra.id}</span>
                <strong className="card-chakra-name">{hoveredChakra.name[currentLang]}</strong>
                <span className="card-chakra-sanskrit">({hoveredChakra.sanskrit})</span>
                <span className="card-chakra-hz">{hoveredChakra.freq}</span>
              </div>
            )}
          </div>
        ) : (
          /* MODO GEOMETRÍA SAGRADA & TORUS */
          <div
            className="breathwork-orbe-core"
            style={{
              transform: `scale(${dynamicScale})`,
              borderColor: `${pattern.color}99`,
              boxShadow: `0 0 50px ${pattern.glowColor}, inset 0 0 35px ${pattern.color}33`
            }}
          >
            <div className="breathwork-sacred-geometry-lines" aria-hidden="true">
              <svg viewBox="0 0 120 120" className="core-yantra-svg">
                <circle cx="60" cy="60" r="50" stroke={pattern.color} strokeWidth="0.8" opacity="0.45" strokeDasharray="2 3" />
                <polygon points="60,18 96,78 24,78" stroke={pattern.color} strokeWidth="1" fill="none" opacity="0.5" />
                <polygon points="60,102 24,42 96,42" stroke={pattern.color} strokeWidth="1" fill="none" opacity="0.5" />
                <circle cx="60" cy="60" r="16" stroke={pattern.color} strokeWidth="1.2" opacity="0.75" />
              </svg>
            </div>
          </div>
        )}

        {/* HUD Flotante de Fase y Contador */}
        <div className="breathwork-hud-overlay">
          <span className="orbe-phase-badge" style={{ color: pattern.color }}>
            <Wind size={13} />
            {isActive ? getPhaseTitle(phase) : (currentLang === 'es' ? 'PRESENCIA' : 'PRESENCE')}
          </span>

          <span className="orbe-seconds-display">
            {isActive ? secondsLeft.toFixed(1) : `${pattern.inhale}s`}
          </span>

          <span className="orbe-sub-status">
            {isActive ? (currentLang === 'es' ? 'segundos' : 'seconds') : (currentLang === 'es' ? 'Listo para iniciar' : 'Ready to begin')}
          </span>
        </div>
      </div>

      {/* Instrucción Sensorial Dinámica de la Fase Activa */}
      <div className="breathwork-instruction-panel">
        <p className="instruction-lead-text">
          {isActive ? getPhaseInstruction(phase) : pattern.description[currentLang]}
        </p>

        {isActive && (
          <div className="breathwork-phase-indicator-pill" style={{ borderColor: pattern.color }}>
            <span className="indicator-phase-name" style={{ color: pattern.color }}>
              {getPhaseTitle(phase)}
            </span>
            <span className="indicator-sep">·</span>
            <span className="indicator-time">
              {Math.ceil(secondsLeft)} {currentLang === 'es' ? 'segundos restantes' : 'seconds left'}
            </span>
          </div>
        )}
      </div>

      {/* Panel de Controles: Iniciar/Pausar, Reiniciar y Sonido */}
      <div className="breathwork-controls-bar">
        <button
          type="button"
          className={`breathwork-main-cta ${isActive ? 'is-active' : ''}`}
          onClick={handleToggle}
          style={{
            borderColor: pattern.color,
            boxShadow: isActive ? `0 0 25px ${pattern.glowColor}` : 'none'
          }}
        >
          {isActive ? <Pause size={17} /> : <Play size={17} fill="currentColor" />}
          <span>{isActive ? t.breathwork.pauseBtn : t.breathwork.startBtn}</span>
        </button>

        <button
          type="button"
          className="breathwork-secondary-btn"
          onClick={handleReset}
          title={t.breathwork.resetBtn}
          aria-label={t.breathwork.resetBtn}
        >
          <RotateCcw size={16} />
          <span>{t.breathwork.resetBtn}</span>
        </button>

        <button
          type="button"
          className={`breathwork-secondary-btn ${soundEnabled ? 'sound-active' : ''}`}
          onClick={() => {
            const nextSound = !soundEnabled;
            setSoundEnabled(nextSound);
            if (nextSound) playSingingBowl(432);
          }}
          title={soundEnabled ? t.breathwork.soundOn : t.breathwork.soundOff}
          aria-label={soundEnabled ? t.breathwork.soundOn : t.breathwork.soundOff}
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          <span>{soundEnabled ? t.breathwork.soundOn : t.breathwork.soundOff}</span>
          {soundEnabled && <span className="sound-active-dot" aria-hidden="true" />}
        </button>
      </div>

      {/* Contador de Ciclos Completados */}
      <div className="breathwork-stats-footer">
        <div className="stat-pill">
          <CheckCircle2 size={14} color="#34D399" />
          <span>{t.breathwork.cycleCount}:</span>
          <strong className="stat-value">{completedCycles}</strong>
        </div>
      </div>
    </div>
  );
};

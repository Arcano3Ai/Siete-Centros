import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Wind, CheckCircle2 } from 'lucide-react';
import { getStoredLanguage, DICTIONARY, Language } from '../../i18n/translations';

export type BreathPattern = 'trilogy' | 'box' | 'kriya';
export type BreathPhase = 'Inhala' | 'Sostiene' | 'Exhala' | 'Vacío';

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

export const BreathworkOrbe: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<BreathPattern>('trilogy');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [phase, setPhase] = useState<BreathPhase>('Inhala');
  const [phaseProgress, setPhaseProgress] = useState<number>(0); // 0 to 1 smooth
  const [secondsLeft, setSecondsLeft] = useState<number>(4);
  const [completedCycles, setCompletedCycles] = useState<number>(0);
  const [currentLang, setCurrentLang] = useState<Language>(getStoredLanguage());

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

        // Play bowl sound on phase shift
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

  if (!isActive) {
    dynamicScale = 1;
    haloOpacity = 0.25;
  } else if (phase === 'Inhala') {
    // Smooth Sine curve expansion 1.0 -> 1.62
    const eased = Math.sin((phaseProgress * Math.PI) / 2);
    dynamicScale = 1.0 + eased * 0.62;
    haloOpacity = 0.25 + eased * 0.60;
  } else if (phase === 'Sostiene') {
    // Sostiene: Full expansion with alive subtle heartbeat
    const heartbeat = Math.sin(phaseProgress * Math.PI * 4) * 0.035;
    dynamicScale = 1.62 + heartbeat;
    haloOpacity = 0.85;
  } else if (phase === 'Exhala') {
    // Smooth gentle contraction 1.62 -> 0.92
    const eased = Math.sin((phaseProgress * Math.PI) / 2);
    dynamicScale = 1.62 - eased * 0.70;
    haloOpacity = 0.85 - eased * 0.60;
  } else {
    // Vacío: Still stillness
    const still = Math.sin(phaseProgress * Math.PI * 2) * 0.015;
    dynamicScale = 0.92 + still;
    haloOpacity = 0.22;
  }

  // SVG Circular progress stroke calculations
  const strokeDashoffset = 283 - 283 * phaseProgress;

  // Localized phase titles and descriptions
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
      {/* Selector de Patrones Pránicos */}
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

      {/* Escenario Central: Orbe Orgánico Bioluminiscente con Geometría Sagrada */}
      <div className="breathwork-stage" aria-label="Orbe de respiración interactivo">
        {/* Ripple Pránico 1 */}
        <div
          className="prana-ripple prana-ripple-1"
          style={{
            transform: `scale(${dynamicScale * 1.35})`,
            borderColor: pattern.color,
            opacity: haloOpacity * 0.4
          }}
        />

        {/* Ripple Pránico 2 */}
        <div
          className="prana-ripple prana-ripple-2"
          style={{
            transform: `scale(${dynamicScale * 1.18})`,
            borderColor: pattern.color,
            opacity: haloOpacity * 0.6
          }}
        />

        {/* Halo de Resplandor Místico */}
        <div
          className="breathwork-orbe-glow-halo"
          style={{
            transform: `scale(${dynamicScale * 1.12})`,
            background: `radial-gradient(circle, ${pattern.glowColor} 0%, ${pattern.color}15 45%, transparent 75%)`,
            opacity: haloOpacity
          }}
        />

        {/* Anillo Circular SVG con Progreso Fluido 60fps */}
        <svg className="breathwork-circular-ring" viewBox="0 0 100 100" aria-hidden="true">
          <circle
            className="ring-bg"
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(197, 168, 128, 0.12)"
            strokeWidth="1.8"
            fill="none"
          />
          <circle
            className="ring-progress"
            cx="50"
            cy="50"
            r="45"
            stroke={pattern.color}
            strokeWidth="2.6"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 8px ${pattern.color})`
            }}
          />
        </svg>

        {/* Núcleo del Orbe con Geometría Sagrada Respiratoria */}
        <div
          className="breathwork-orbe-core"
          style={{
            transform: `scale(${dynamicScale})`,
            borderColor: `${pattern.color}99`,
            boxShadow: `0 0 50px ${pattern.glowColor}, inset 0 0 35px ${pattern.color}33`
          }}
        >
          {/* Geometría Sagrada Interna (Yantra de Respiración) */}
          <div className="breathwork-sacred-geometry-lines" aria-hidden="true">
            <svg viewBox="0 0 120 120" className="core-yantra-svg">
              <circle cx="60" cy="60" r="50" stroke={pattern.color} strokeWidth="0.8" opacity="0.45" strokeDasharray="2 3" />
              <polygon points="60,18 96,78 24,78" stroke={pattern.color} strokeWidth="1" fill="none" opacity="0.5" />
              <polygon points="60,102 24,42 96,42" stroke={pattern.color} strokeWidth="1" fill="none" opacity="0.5" />
              <circle cx="60" cy="60" r="16" stroke={pattern.color} strokeWidth="1.2" opacity="0.75" />
            </svg>
          </div>

          {/* Texto Central de Fase & Contador Dinámico */}
          <div className="breathwork-orbe-content">
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

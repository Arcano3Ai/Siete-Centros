import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Heart, Compass, Wind } from 'lucide-react';

export type BreathPattern = 'coherence' | 'box' | 'kriya';

interface PatternConfig {
  id: BreathPattern;
  name: string;
  sub: string;
  inhale: number;
  holdIn?: number;
  exhale: number;
  holdOut?: number;
  color: string;
  glowColor: string;
  description: string;
  element: string;
  targetHz: string;
}

const PATTERNS: Record<BreathPattern, PatternConfig> = {
  coherence: {
    id: 'coherence',
    name: 'Coherencia Cardíaca',
    sub: '0.1 Hz · Resonancia Cardiovascular',
    inhale: 5.5,
    exhale: 5.5,
    color: '#34D399', // Anahata Green
    glowColor: 'rgba(52, 211, 153, 0.35)',
    description: 'Sincroniza la variabilidad de la frecuencia cardíaca (VFC) con el sistema nervioso parasimpático, disolviendo el cortisol en sangre.',
    element: 'Aire & Compasión',
    targetHz: '0.1 Hz Coherente'
  },
  box: {
    id: 'box',
    name: 'Caja Pránica (Sama Vritti)',
    sub: '4 · 4 · 4 · 4 · Foco & Soberanía Mental',
    inhale: 4,
    holdIn: 4,
    exhale: 4,
    holdOut: 4,
    color: '#DFBE90', // Sacred Gold
    glowColor: 'rgba(223, 190, 144, 0.4)',
    description: 'Arquitectura pránica cuádruple de máxima estabilidad. Equilibra los hemisferios cerebrales y asienta la mente en calma imperturbable.',
    element: 'Tierra & Fuego',
    targetHz: 'Ondas Alfa 10 Hz'
  },
  kriya: {
    id: 'kriya',
    name: 'Kriya 4-7-8 Transmutación',
    sub: '4 · 7 · 8 · Sueño Profundo & Éxtasis',
    inhale: 4,
    holdIn: 7,
    exhale: 8,
    color: '#C084FC', // Sahasrara Violet
    glowColor: 'rgba(192, 132, 252, 0.4)',
    description: 'Viaje respiratorio tántrico para calmar el nervio vago y facilitar el tránsito a estados alterados de conciencia y reposo celular profundo.',
    element: 'Éter & Luz',
    targetHz: 'Ondas Theta 5 Hz'
  }
};

type BreathPhase = 'Inhala' | 'Sostén' | 'Exhala' | 'Vacío';

const PHRASES: Record<BreathPhase, string> = {
  Inhala: 'Llena tus pulmones... expande el corazón en 360°',
  Sostén: 'Habita el silencio quieto de tu templo interior',
  Exhala: 'Suelta todo el peso... ríndete al sostén de la tierra',
  Vacío: 'Descansa en el vacío fértil donde renace tu ser'
};

export const BreathworkOrbe: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<BreathPattern>('coherence');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [phase, setPhase] = useState<BreathPhase>('Inhala');
  const [phaseProgress, setPhaseProgress] = useState<number>(0); // 0 to 1 smooth
  const [secondsLeft, setSecondsLeft] = useState<number>(5.5);
  const [completedCycles, setCompletedCycles] = useState<number>(0);

  const pattern = PATTERNS[selectedPattern];

  // Web Audio Context for Procedural Tibetan Singing Bowl (432 Hz)
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

      // Harmonic Oscillator (Octave + Shimmer)
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
      // Audio not permitted or unsupported, fails gracefully
    }
  }, [soundEnabled]);

  // RequestAnimationFrame continuous physics engine for ultra-smooth 60fps breathing
  const animRef = useRef<number | null>(null);
  const phaseStartTimeRef = useRef<number>(0);
  const currentPhaseDurationRef = useRef<number>(pattern.inhale);

  const getDurationForPhase = useCallback((p: BreathPhase, cfg: PatternConfig): number => {
    switch (p) {
      case 'Inhala': return cfg.inhale;
      case 'Sostén': return cfg.holdIn || 4;
      case 'Exhala': return cfg.exhale;
      case 'Vacío': return cfg.holdOut || 4;
    }
  }, []);

  const getNextPhase = useCallback((currentP: BreathPhase, cfg: PatternConfig): { nextPhase: BreathPhase; completed: boolean } => {
    if (cfg.id === 'coherence') {
      return currentP === 'Inhala'
        ? { nextPhase: 'Exhala', completed: false }
        : { nextPhase: 'Inhala', completed: true };
    }
    if (cfg.id === 'box') {
      if (currentP === 'Inhala') return { nextPhase: 'Sostén', completed: false };
      if (currentP === 'Sostén') return { nextPhase: 'Exhala', completed: false };
      if (currentP === 'Exhala') return { nextPhase: 'Vacío', completed: false };
      return { nextPhase: 'Inhala', completed: true };
    }
    // kriya (4-7-8)
    if (currentP === 'Inhala') return { nextPhase: 'Sostén', completed: false };
    if (currentP === 'Sostén') return { nextPhase: 'Exhala', completed: false };
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
        else if (nextPhase === 'Sostén') playSingingBowl(528); // Miracles frequency
        else if (nextPhase === 'Exhala') playSingingBowl(396); // Release frequency
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

  // Compute organic smooth scale and glow based on smooth progress
  let dynamicScale = 1;
  let haloOpacity = 0.3;

  if (!isActive) {
    dynamicScale = 1;
    haloOpacity = 0.25;
  } else if (phase === 'Inhala') {
    // Smooth Sine curve expansion 1.0 -> 1.55
    const eased = Math.sin((phaseProgress * Math.PI) / 2);
    dynamicScale = 1.0 + eased * 0.55;
    haloOpacity = 0.25 + eased * 0.55;
  } else if (phase === 'Sostén') {
    // Sostén: Full expansion with micro breathing heartbeat pulse
    const heartbeat = Math.sin(phaseProgress * Math.PI * 4) * 0.03;
    dynamicScale = 1.55 + heartbeat;
    haloOpacity = 0.8;
  } else if (phase === 'Exhala') {
    // Smooth contraction 1.55 -> 0.90
    const eased = Math.sin((phaseProgress * Math.PI) / 2);
    dynamicScale = 1.55 - eased * 0.65;
    haloOpacity = 0.8 - eased * 0.55;
  } else {
    // Vacío: Soft crystalline stillness
    const still = Math.sin(phaseProgress * Math.PI * 2) * 0.015;
    dynamicScale = 0.9 + still;
    haloOpacity = 0.2;
  }

  // SVG Circular progress stroke calculations (radius = 45 -> circumference = 2 * PI * 45 = 282.74)
  const strokeDashoffset = 283 - 283 * phaseProgress;

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
              <span>{p.name}</span>
            </button>
          );
        })}
      </div>

      <div className="breathwork-pattern-meta">
        <span className="meta-sub">{pattern.sub}</span>
        <span className="meta-hz" style={{ color: pattern.color }}>
          <Sparkles size={11} /> {pattern.targetHz}
        </span>
      </div>

      {/* Escenario Central: Orbe Orgánico Bioluminiscente con Geometría Sagrada */}
      <div className="breathwork-stage" aria-label="Orbe de respiración interactivo">
        {/* Ripple Pránico 1 (Onda Externa) */}
        <div
          className="prana-ripple prana-ripple-1"
          style={{
            transform: `scale(${dynamicScale * 1.35})`,
            borderColor: pattern.color,
            opacity: haloOpacity * 0.4
          }}
        />

        {/* Ripple Pránico 2 (Onda Media) */}
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
            strokeWidth="2.4"
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
            boxShadow: `0 0 45px ${pattern.glowColor}, inset 0 0 30px ${pattern.color}33`
          }}
        >
          {/* Mandala Geométrico de Respiración (Loto de 8 Pétalos que respira) */}
          <div
            className="sacred-breathing-mandala"
            style={{
              transform: `rotate(${phaseProgress * 45}deg)`,
              opacity: isActive ? 0.75 : 0.45
            }}
          >
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <span
                key={deg}
                className="mandala-petal"
                style={{
                  transform: `rotate(${deg}deg) translateY(-22px)`,
                  backgroundColor: pattern.color
                }}
              />
            ))}
          </div>

          {/* Núcleo Estelar Central */}
          <div
            className="orbe-sacred-center"
            style={{
              backgroundColor: pattern.color,
              boxShadow: `0 0 20px ${pattern.color}, 0 0 40px ${pattern.color}`
            }}
          />
        </div>

        {/* Textos Centrales: Fase, Contador y Guía */}
        <div className="breathwork-center-text">
          <span className="phase-label" style={{ color: pattern.color }}>
            {isActive ? phase : 'Respira'}
          </span>
          <span className="seconds-count">
            {isActive ? `${secondsLeft.toFixed(1)}s` : 'Iniciar'}
          </span>
          {completedCycles > 0 && (
            <span className="cycle-badge">
              <Sparkles size={10} /> Ciclo {completedCycles}
            </span>
          )}
        </div>
      </div>

      {/* Guía Somática Consciente en Tiempo Real */}
      <div className="breathwork-guidance-box">
        <p className="guidance-phrase" style={{ color: isActive ? '#FAF7F2' : 'rgba(250, 247, 242, 0.7)' }}>
          {isActive ? PHRASES[phase] : 'Selecciona tu frecuencia pránica y pulsa Iniciar para armonizar tu respiración.'}
        </p>
      </div>

      {/* Descripción Científico-Espiritual del Patrón */}
      <p className="breathwork-desc">{pattern.description}</p>

      {/* Panel de Controles: Iniciar/Pausar, Reiniciar y Sonido 432 Hz */}
      <div className="breathwork-controls">
        <button
          type="button"
          className="btn btn-primary breathwork-main-btn"
          onClick={handleToggle}
          style={{ minWidth: '190px', gap: '0.65rem' }}
        >
          {isActive ? (
            <>
              <Pause size={16} />
              <span>Pausar Respiración</span>
            </>
          ) : (
            <>
              <Play size={16} />
              <span>Iniciar Alquimia</span>
            </>
          )}
        </button>

        <button
          type="button"
          className="btn btn-secondary breathwork-icon-btn"
          onClick={handleReset}
          title="Reiniciar práctica"
          aria-label="Reiniciar práctica"
        >
          <RotateCcw size={16} />
        </button>

        <button
          type="button"
          className={`btn btn-secondary breathwork-icon-btn ${soundEnabled ? 'active-sound' : ''}`}
          onClick={() => setSoundEnabled(!soundEnabled)}
          title={soundEnabled ? 'Cuenco Tibetano 432 Hz Activado' : 'Sonido Silenciado'}
          aria-label={soundEnabled ? 'Cuenco Tibetano 432 Hz Activado' : 'Sonido Silenciado'}
        >
          {soundEnabled ? <Volume2 size={16} style={{ color: 'var(--gold-bright)' }} /> : <VolumeX size={16} />}
        </button>
      </div>

      {/* Llamada Directa y Contextual a WhatsApp para Breathwork Privado */}
      <div className="breathwork-footer-cta">
        <a
          href="https://wa.me/5215512345678?text=Hola%20Sof%C3%ADa%2C%20deseo%20agendar%20una%20sesi%C3%B3n%20individual%20de%20Breathwork%20y%20Liberaci%C3%B3n%20Som%C3%A1tica%20en%20Siete%20Centros"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-niche-link"
        >
          {/* Icono Sagrado del Nicho: Loto con Geometría de Resonancia */}
          <span className="niche-icon-wrap" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="niche-sacred-icon">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeDasharray="2 3" opacity="0.6" />
              <path d="M12 3C8 8 7 13 12 21C17 13 16 8 12 3Z" fill="currentColor" fillOpacity="0.15" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </span>
          <div className="niche-link-text">
            <span className="niche-link-title">Agendar Inmersión Somática de Breathwork</span>
            <span className="niche-link-sub">Atención personalizada con Sofía vía WhatsApp</span>
          </div>
        </a>
      </div>
    </div>
  );
};

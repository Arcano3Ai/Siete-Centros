import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Wind, Heart, Sparkles } from 'lucide-react';

export type BreathPattern = 'coherence' | 'box' | 'kriya';

interface PatternConfig {
  name: string;
  sub: string;
  inhale: number;
  holdIn?: number;
  exhale: number;
  holdOut?: number;
  color: string;
  description: string;
}

const PATTERNS: Record<BreathPattern, PatternConfig> = {
  coherence: {
    name: 'Coherencia Cardíaca',
    sub: 'Frecuencia 0.1 Hz · Calma del Sistema Nervioso',
    inhale: 5.5,
    exhale: 5.5,
    color: '#34D399', // Anahata Green
    description: 'Equilibra el ritmo cardíaco, sincroniza la variabilidad cardiovascular y disuelve el cortisol.'
  },
  box: {
    name: 'Caja Pránica (Sama Vritti)',
    sub: '4 · 4 · 4 · 4 · Foco y Estabilidad Mental',
    inhale: 4,
    holdIn: 4,
    exhale: 4,
    holdOut: 4,
    color: '#DFBE90', // Sacred Gold
    description: 'Enraizamiento absoluto. Equilibra los hemisferios cerebrales y restaura la quietud interior.'
  },
  kriya: {
    name: 'Kriya Despertar',
    sub: '4 · 7 · 8 · Transmutación y Trascendencia',
    inhale: 4,
    holdIn: 7,
    exhale: 8,
    color: '#C084FC', // Sahasrara Violet
    description: 'Viaje respiratorio profundo para acceder a ondas cerebrales alfa y theta, induciendo paz somática.'
  }
};

export const BreathworkOrbe: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<BreathPattern>('coherence');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [phase, setPhase] = useState<'Inhala' | 'Sostén' | 'Exhala' | 'Vacío'>('Inhala');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(5.5);
  const [completedCycles, setCompletedCycles] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);

  const pattern = PATTERNS[selectedPattern];

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive) {
      const interval = 100; // 100ms precision ticks
      timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 0.1) {
            // Advance Phase
            if (selectedPattern === 'coherence') {
              if (phase === 'Inhala') {
                setPhase('Exhala');
                return pattern.exhale;
              } else {
                setPhase('Inhala');
                setCompletedCycles((c) => c + 1);
                return pattern.inhale;
              }
            } else if (selectedPattern === 'box') {
              if (phase === 'Inhala') {
                setPhase('Sostén');
                return pattern.holdIn || 4;
              } else if (phase === 'Sostén') {
                setPhase('Exhala');
                return pattern.exhale;
              } else if (phase === 'Exhala') {
                setPhase('Vacío');
                return pattern.holdOut || 4;
              } else {
                setPhase('Inhala');
                setCompletedCycles((c) => c + 1);
                return pattern.inhale;
              }
            } else {
              // kriya
              if (phase === 'Inhala') {
                setPhase('Sostén');
                return pattern.holdIn || 7;
              } else if (phase === 'Sostén') {
                setPhase('Exhala');
                return pattern.exhale;
              } else {
                setPhase('Inhala');
                setCompletedCycles((c) => c + 1);
                return pattern.inhale;
              }
            }
          }
          return Math.max(0, parseFloat((prev - 0.1).toFixed(1)));
        });
      }, interval);
    }

    return () => clearInterval(timer);
  }, [isActive, phase, selectedPattern, pattern]);

  // Dynamic Scale update based on breath phase
  useEffect(() => {
    if (!isActive) {
      setScale(1);
      return;
    }

    if (phase === 'Inhala') {
      setScale(1.45);
    } else if (phase === 'Exhala') {
      setScale(0.92);
    } else {
      // Sostén o Vacío
      setScale(phase === 'Sostén' ? 1.48 : 0.9);
    }
  }, [phase, isActive]);

  const handleToggle = () => {
    if (!isActive) {
      setPhase('Inhala');
      setSecondsRemaining(pattern.inhale);
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('Inhala');
    setSecondsRemaining(pattern.inhale);
    setCompletedCycles(0);
    setScale(1);
  };

  const currentDuration =
    phase === 'Inhala'
      ? pattern.inhale
      : phase === 'Exhala'
      ? pattern.exhale
      : phase === 'Sostén'
      ? pattern.holdIn || 4
      : pattern.holdOut || 4;

  const progress = Math.max(0, Math.min(1, (currentDuration - secondsRemaining) / currentDuration));
  const strokeDashoffset = 283 - 283 * progress;

  return (
    <div className="breathwork-container">
      {/* Pattern Selector Pills */}
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
                borderColor: isSelected ? p.color : 'rgba(197, 168, 128, 0.2)',
                color: isSelected ? '#FAF7F2' : 'rgba(250, 247, 242, 0.6)'
              }}
              onClick={() => {
                setSelectedPattern(key);
                setIsActive(false);
                setPhase('Inhala');
                setSecondsRemaining(PATTERNS[key].inhale);
              }}
            >
              <span className="tab-dot" style={{ backgroundColor: p.color }} />
              <span>{p.name}</span>
            </button>
          );
        })}
      </div>

      <p className="breathwork-pattern-sub">{pattern.sub}</p>

      {/* Main Breathing Stage with Luminous Orbe */}
      <div className="breathwork-stage">
        {/* SVG Circular Progress Ring */}
        <svg className="breathwork-circular-ring" viewBox="0 0 100 100">
          <circle
            className="ring-bg"
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(197, 168, 128, 0.12)"
            strokeWidth="2.5"
            fill="none"
          />
          <circle
            className="ring-progress"
            cx="50"
            cy="50"
            r="45"
            stroke={pattern.color}
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.1s linear, stroke 0.6s ease'
            }}
          />
        </svg>

        {/* Dynamic Expanding/Contracting Breathing Orbe */}
        <div
          className="breathwork-orbe-glow-halo"
          style={{
            transform: `scale(${scale * 1.15})`,
            background: `radial-gradient(circle, ${pattern.color}33 0%, ${pattern.color}11 50%, transparent 75%)`,
            transition: `transform ${phase === 'Inhala' ? pattern.inhale : pattern.exhale}s cubic-bezier(0.4, 0, 0.2, 1)`
          }}
        />

        <div
          className="breathwork-orbe-core"
          style={{
            transform: `scale(${scale})`,
            borderColor: `${pattern.color}88`,
            boxShadow: `0 0 35px ${pattern.color}44, inset 0 0 25px ${pattern.color}22`,
            transition: `transform ${phase === 'Inhala' ? pattern.inhale : pattern.exhale}s cubic-bezier(0.4, 0, 0.2, 1)`
          }}
        >
          {/* Inner Sacred Light Particles */}
          <div className="orbe-particles" />
          <div className="orbe-sacred-center" style={{ backgroundColor: pattern.color }} />
        </div>

        {/* Central Minimalist Readout */}
        <div className="breathwork-center-text">
          <span className="phase-label" style={{ color: pattern.color }}>
            {isActive ? phase : 'Listo'}
          </span>
          <span className="seconds-count">
            {isActive ? `${secondsRemaining.toFixed(0)}s` : 'Iniciar'}
          </span>
          {completedCycles > 0 && (
            <span className="cycle-badge">Ciclo {completedCycles}</span>
          )}
        </div>
      </div>

      {/* Description Note */}
      <p className="breathwork-desc">{pattern.description}</p>

      {/* Controls: Play / Pause / Reset */}
      <div className="breathwork-controls">
        <button
          type="button"
          className="btn btn-primary breathwork-main-btn"
          onClick={handleToggle}
          style={{ minWidth: '180px' }}
        >
          {isActive ? (
            <>
              <Pause size={16} />
              <span>Pausar Práctica</span>
            </>
          ) : (
            <>
              <Play size={16} />
              <span>Comenzar Inhalación</span>
            </>
          )}
        </button>

        <button
          type="button"
          className="btn btn-secondary breathwork-icon-btn"
          onClick={handleReset}
          title="Reiniciar contador"
          aria-label="Reiniciar contador"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Direct WhatsApp Consultation */}
      <div className="breathwork-footer-cta">
        <a
          href="https://wa.me/5215512345678?text=Hola%20Sof%C3%ADa%2C%20deseo%20agendar%20una%20sesi%C3%B3n%20individual%20de%20Breathwork%20y%20Liberaci%C3%B3n%20Som%C3%A1tica%20en%20Siete%20Centros"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-contextual-link"
        >
          <Sparkles size={14} />
          <span>Agendar Sesión Privada de Breathwork con Sofía</span>
        </a>
      </div>
    </div>
  );
};

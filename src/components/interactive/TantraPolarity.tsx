import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Sun, Moon, Infinity as InfinityIcon, ArrowRight } from 'lucide-react';
import { getStoredLanguage, Language } from '../../i18n/translations';

interface PolarityInsight {
  title: { es: string; en: string };
  quote: { es: string; en: string };
  theme: { es: string; en: string };
}

const POLARITY_INSIGHTS: PolarityInsight[] = [
  {
    title: { es: 'La Danza de Shiva & Shakti', en: 'The Dance of Shiva & Shakti' },
    quote: {
      es: 'La conciencia inmóvil (Shiva) sostiene el espacio para que la energía vital (Shakti) dance en plenitud.',
      en: 'Motionless consciousness (Shiva) holds absolute space for vital energy (Shakti) to dance in freedom.'
    },
    theme: { es: 'Presencia & Movimiento', en: 'Presence & Movement' }
  },
  {
    title: { es: 'El Tacto sin Demanda', en: 'Non-Demanding Touch' },
    quote: {
      es: 'Tocar el cuerpo sin buscar cambiarlo ni apresurarlo: la devoción que disuelve la coraza afectiva.',
      en: 'Touching the body without seeking to alter or rush it: authentic devotion dissolves armoring.'
    },
    theme: { es: 'Sensibilidad Pura', en: 'Pure Sensitivity' }
  },
  {
    title: { es: 'La Polaridad como Imán', en: 'Polarity as Magnetism' },
    quote: {
      es: 'No se trata de fusionar la identidad, sino de habitar la propia raíz para que el encuentro sea un éxtasis consciente.',
      en: 'It is not about erasing identity, but deeply inhabiting one\'s own root so the meeting is conscious bliss.'
    },
    theme: { es: 'Atracción Sagrada', en: 'Sacred Attraction' }
  },
  {
    title: { es: 'El Templo del Aliento', en: 'The Temple of Breath' },
    quote: {
      es: 'Al respirar al unísono, los límites del ego se tornan diáfanos y la devoción se vuelve tangible.',
      en: 'Breathing in unison renders ego boundaries translucent and devotion deeply tangible.'
    },
    theme: { es: 'Sincronía Somática', en: 'Somatic Synchrony' }
  }
];

export const TantraPolarity: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [insightIndex, setInsightIndex] = useState<number>(0);
  const [proximityScore, setProximityScore] = useState<number>(50); // 0 to 100%
  const [isMerged, setIsMerged] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<Language>(getStoredLanguage());

  const currentInsight = POLARITY_INSIGHTS[insightIndex];

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 480);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 360;
      }
    };

    window.addEventListener('resize', handleResize);

    let angle = 0;
    let targetX = width / 2;
    let targetY = height / 2;
    let mouseActive = false;

    // Particle 1 (Shiva - Celestial Indigo / Luminous Blue)
    let p1 = { x: width / 2 - 70, y: height / 2, radius: 12, color: 'rgb(96, 165, 250)' };
    // Particle 2 (Shakti - Warm Amber Gold / Solar Fire)
    let p2 = { x: width / 2 + 70, y: height / 2, radius: 12, color: 'rgb(223, 190, 144)' };

    // Star Trail History
    const trail: { x: number; y: number; color: string; alpha: number; size: number }[] = [];

    const updateCoords = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
        targetX = clientX - rect.left;
        targetY = clientY - rect.top;
        mouseActive = true;
      }
    };

    const onMouseMove = (e: MouseEvent) => updateCoords(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onLeave = () => {
      mouseActive = false;
      targetX = width / 2;
      targetY = height / 2;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('touchmove', onTouchMove);
    canvas.addEventListener('touchend', onLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Background Subtle Sacred Yantra
      ctx.save();
      ctx.strokeStyle = 'rgba(223, 190, 144, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 100, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 60, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      angle += 0.024;

      // Orbit math: Lemniscate / Elliptic dance
      const orbitRadiusX = mouseActive ? 60 : 80;
      const orbitRadiusY = mouseActive ? 45 : 60;

      const centerX = mouseActive ? targetX : width / 2;
      const centerY = mouseActive ? targetY : height / 2;

      // Calculate Shiva & Shakti positions
      p1.x += (centerX + Math.cos(angle) * orbitRadiusX - p1.x) * 0.12;
      p1.y += (centerY + Math.sin(angle) * orbitRadiusY - p1.y) * 0.12;

      p2.x += (centerX - Math.cos(angle) * orbitRadiusX - p2.x) * 0.12;
      p2.y += (centerY - Math.sin(angle) * orbitRadiusY - p2.y) * 0.12;

      // Proximity Calculation
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      const maxDist = 160;
      const proximity = Math.max(0, Math.min(100, Math.round(((maxDist - dist) / maxDist) * 100)));
      setProximityScore(proximity);

      const merged = dist < 38;
      setIsMerged(merged);

      // Add to star trail
      trail.push({ x: p1.x, y: p1.y, color: '96, 165, 250', alpha: 0.65, size: 3.5 });
      trail.push({ x: p2.x, y: p2.y, color: '223, 190, 144', alpha: 0.65, size: 3.5 });

      if (trail.length > 55) {
        trail.splice(0, 2);
      }

      // Draw Trails
      trail.forEach((t) => {
        t.alpha *= 0.94;
        ctx.fillStyle = `rgba(${t.color}, ${t.alpha})`;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Connecting energy thread with harmonic golden shimmer
      ctx.strokeStyle = `rgba(223, 190, 144, ${Math.max(0.18, proximity / 100)})`;
      ctx.lineWidth = Math.max(1, (proximity / 100) * 3.5);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      // Convergence flash when close
      if (proximity > 68) {
        ctx.fillStyle = `rgba(255, 255, 255, ${(proximity - 68) / 100})`;
        ctx.beginPath();
        ctx.arc((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, (proximity - 68) * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Particle 1: Shiva (Luz Estelar Azul / Blanco)
      const grad1 = ctx.createRadialGradient(p1.x, p1.y, 1, p1.x, p1.y, 26);
      grad1.addColorStop(0, '#ffffff');
      grad1.addColorStop(0.3, p1.color);
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.arc(p1.x, p1.y, 26, 0, Math.PI * 2);
      ctx.fill();

      // Draw Particle 2: Shakti (Fuego Ámbar Solar Creador)
      const grad2 = ctx.createRadialGradient(p2.x, p2.y, 1, p2.x, p2.y, 26);
      grad2.addColorStop(0, '#ffffff');
      grad2.addColorStop(0.3, p2.color);
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(p2.x, p2.y, 26, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="tantra-polarity-container">
      {/* Top Meta Header */}
      <div className="tantra-header-meta">
        <div className="polarity-badge">
          <InfinityIcon size={14} className="gold-icon" />
          <span>
            {currentLang === 'es'
              ? 'Equilibrio de Polaridades · Shiva & Shakti'
              : 'Polarity Alchemy · Shiva & Shakti'}
          </span>
        </div>
        <div className="polarity-counter">
          {currentLang === 'es' ? 'Sincronía' : 'Synchrony'}: <span className="gold-num">{proximityScore}%</span>
        </div>
      </div>

      {/* Interactive Canvas Stage */}
      <div className="tantra-canvas-wrap">
        <canvas ref={canvasRef} className="tantra-canvas" />
        <div className="canvas-instruction-cue">
          {currentLang === 'es'
            ? 'Mueve el cursor o toca para guiar el flujo de las polaridades'
            : 'Move cursor or touch to guide the polarity dance'}
        </div>

        {/* Dynamic State Pill */}
        <div className={`polarity-status-pill ${isMerged ? 'merged' : ''}`}>
          {isMerged
            ? (currentLang === 'es' ? '✨ Unión y Coherencia Tántrica' : '✨ Sacred Union & Tantric Coherence')
            : (currentLang === 'es' ? 'Orbitando en Resonancia Somática' : 'Orbiting in Somatic Resonance')}
        </div>
      </div>

      {/* Wisdom Rotator Cards */}
      <div className="tantra-insight-card">
        <div className="insight-top">
          <span className="insight-theme">{currentInsight.theme[currentLang]}</span>
          <div className="insight-dots">
            {POLARITY_INSIGHTS.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`dot-btn ${i === insightIndex ? 'active' : ''}`}
                onClick={() => setInsightIndex(i)}
                aria-label={`Enseñanza ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <h4 className="insight-title">{currentInsight.title[currentLang]}</h4>
        <blockquote className="insight-quote">«{currentInsight.quote[currentLang]}»</blockquote>
      </div>

      {/* WhatsApp Booking CTA */}
      <div className="tantra-cta-box">
        <a
          href="https://wa.me/5215512345678?text=Hola%20Sof%C3%ADa%2C%20deseo%20consultar%20sobre%20las%20sesiones%20de%20Tantra%20Terap%C3%A9utico%20en%20Siete%20Centros"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary tantra-btn"
        >
          <span>
            {currentLang === 'es'
              ? 'Consultar Sesión de Tantra Terapéutico'
              : 'Inquire About Tantric Healing Session'}
          </span>
          <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
};

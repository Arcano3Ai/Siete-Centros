import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Sun, Moon, Infinity as InfinityIcon, ArrowRight } from 'lucide-react';

interface PolarityInsight {
  title: string;
  quote: string;
  theme: string;
}

const POLARITY_INSIGHTS: PolarityInsight[] = [
  {
    title: 'La Danza de Shiva & Shakti',
    quote: 'La conciencia inmóvil (Shiva) sostiene el espacio para que la energía vital (Shakti) dance en plenitud.',
    theme: 'Presencia & Movimiento'
  },
  {
    title: 'El Tacto sin Demanda',
    quote: 'Tocar el cuerpo sin buscar cambiarlo ni apresurarlo: la devoción que disuelve la coraza afectiva.',
    theme: 'Sensibilidad Pura'
  },
  {
    title: 'La Polaridad como Imán',
    quote: 'No se trata de fusionar la identidad, sino de habitar la propia raíz para que el encuentro sea un éxtasis consciente.',
    theme: 'Atracción Sagrada'
  },
  {
    title: 'El Templo del Aliento',
    quote: 'Al respirar al unísono, los límites del ego se tornan diáfanos y la devoción se vuelve tangible.',
    theme: 'Sincronía Somática'
  }
];

export const TantraPolarity: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [insightIndex, setInsightIndex] = useState<number>(0);
  const [proximityScore, setProximityScore] = useState<number>(50); // 0 to 100%
  const [isMerged, setIsMerged] = useState<boolean>(false);

  const currentInsight = POLARITY_INSIGHTS[insightIndex];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 480);
    let height = (canvas.height = 340);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 340;
      }
    };

    window.addEventListener('resize', handleResize);

    let angle = 0;
    let targetX = width / 2;
    let targetY = height / 2;
    let mouseActive = false;

    // Particle 1 (Shiva - Celestial Blue / White)
    let p1 = { x: width / 2 - 60, y: height / 2, radius: 10, color: 'rgb(56, 189, 248)' };
    // Particle 2 (Shakti - Warm Amber Gold / Ruby)
    let p2 = { x: width / 2 + 60, y: height / 2, radius: 10, color: 'rgb(223, 190, 144)' };

    // Star Trail History
    const trail: { x: number; y: number; color: string; alpha: number; size: number }[] = [];

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
        mouseActive = true;
      }
    };

    const onMouseLeave = () => {
      mouseActive = false;
      targetX = width / 2;
      targetY = height / 2;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angle += 0.025;

      // Orbit math: Lemniscate / Elliptic dance
      const orbitRadiusX = mouseActive ? 55 : 75;
      const orbitRadiusY = mouseActive ? 40 : 55;

      const centerX = mouseActive ? targetX : width / 2;
      const centerY = mouseActive ? targetY : height / 2;

      // Calculate Shiva & Shakti positions
      p1.x += (centerX + Math.cos(angle) * orbitRadiusX - p1.x) * 0.12;
      p1.y += (centerY + Math.sin(angle) * orbitRadiusY - p1.y) * 0.12;

      p2.x += (centerX - Math.cos(angle) * orbitRadiusX - p2.x) * 0.12;
      p2.y += (centerY - Math.sin(angle) * orbitRadiusY - p2.y) * 0.12;

      // Proximity Calculation
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      const maxDist = 150;
      const proximity = Math.max(0, Math.min(100, Math.round(((maxDist - dist) / maxDist) * 100)));
      setProximityScore(proximity);

      const merged = dist < 35;
      setIsMerged(merged);

      // Add to star trail
      trail.push({ x: p1.x, y: p1.y, color: '56, 189, 248', alpha: 0.6, size: 3 });
      trail.push({ x: p2.x, y: p2.y, color: '223, 190, 144', alpha: 0.6, size: 3 });

      if (trail.length > 50) {
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

      // Connecting energy thread
      ctx.strokeStyle = `rgba(223, 190, 144, ${Math.max(0.15, proximity / 100)})`;
      ctx.lineWidth = Math.max(1, (proximity / 100) * 3);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      // Convergence flash when close
      if (proximity > 70) {
        ctx.fillStyle = `rgba(255, 255, 255, ${(proximity - 70) / 100})`;
        ctx.beginPath();
        ctx.arc((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, (proximity - 70) * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Particle 1: Shiva (Luz Solar Cósmica)
      const grad1 = ctx.createRadialGradient(p1.x, p1.y, 1, p1.x, p1.y, 24);
      grad1.addColorStop(0, '#ffffff');
      grad1.addColorStop(0.3, p1.color);
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.arc(p1.x, p1.y, 24, 0, Math.PI * 2);
      ctx.fill();

      // Draw Particle 2: Shakti (Fuego Ámbar Creador)
      const grad2 = ctx.createRadialGradient(p2.x, p2.y, 1, p2.x, p2.y, 24);
      grad2.addColorStop(0, '#ffffff');
      grad2.addColorStop(0.3, p2.color);
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(p2.x, p2.y, 24, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="tantra-polarity-container">
      {/* Top Meta Header */}
      <div className="tantra-header-meta">
        <div className="polarity-badge">
          <InfinityIcon size={14} className="gold-icon" />
          <span>Equilibrio de Polaridades · Shiva & Shakti</span>
        </div>
        <div className="polarity-counter">
          Sincronía: <span className="gold-num">{proximityScore}%</span>
        </div>
      </div>

      {/* Interactive Canvas Stage */}
      <div className="tantra-canvas-wrap">
        <canvas ref={canvasRef} className="tantra-canvas" />
        <div className="canvas-instruction-cue">
          Mueve el cursor sobre el lienzo para guiar el flujo de las polaridades
        </div>

        {/* Dynamic State Pill */}
        <div className={`polarity-status-pill ${isMerged ? 'merged' : ''}`}>
          {isMerged ? '✨ Unión y Coherencia Tántrica' : 'Orbitando en Resonancia Somática'}
        </div>
      </div>

      {/* Wisdom Rotator Cards */}
      <div className="tantra-insight-card">
        <div className="insight-top">
          <span className="insight-theme">{currentInsight.theme}</span>
          <div className="insight-dots">
            {POLARITY_INSIGHTS.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`dot-btn ${i === insightIndex ? 'active' : ''}`}
                onClick={() => setInsightIndex(i)}
                aria-label={`Ver enseñanza tántrica ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <h4 className="insight-title">{currentInsight.title}</h4>
        <blockquote className="insight-quote">«{currentInsight.quote}»</blockquote>
      </div>

      {/* WhatsApp Booking CTA */}
      <div className="tantra-cta-box">
        <a
          href="https://wa.me/5215512345678?text=Hola%20Sof%C3%ADa%2C%20deseo%20consultar%20sobre%20las%20sesiones%20de%20Tantra%20Terap%C3%A9utico%20y%20Sanaci%C3%B3n%20de%20la%20Polaridad%20en%20Siete%20Centros"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary tantra-btn"
        >
          <span>Consultar Sesión de Tantra Terapéutico</span>
          <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
};

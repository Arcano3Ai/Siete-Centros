import React, { useState } from 'react';
import { Calendar, MapPin, Users, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface RetreatItem {
  id: string;
  title: string;
  subtitle: string;
  dates: string;
  location: string;
  spotsLeft: number;
  totalSpots: number;
  priceTag: string;
  image: string;
  highlights: string[];
  waMessage: string;
}

const RETREATS: RetreatItem[] = [
  {
    id: 'retiro-tepoztlan',
    title: 'Silencio & Renacer Somático',
    subtitle: 'Inmersión de 4 Días entre Montañas Volcánicas',
    dates: '14 — 17 Noviembre 2026',
    location: 'Santuario de Tepoztlán, Morelos',
    spotsLeft: 3,
    totalSpots: 12,
    priceTag: 'Cupo Limitado',
    image: '/images/exp_kriya.jpg',
    highlights: [
      'Kriya Yoga matutino al amanecer',
      'Breathwork somático de liberación',
      'Ceremonia de cacao & palabra consciente',
      'Hospedaje boutique y alimentación botánica'
    ],
    waMessage: 'Hola Sofía, deseo postularme para reservar uno de los últimos 3 lugares en el Retiro Silencio & Renacer Somático en Tepoztlán.'
  },
  {
    id: 'retiro-valle',
    title: 'Tantra & Polaridad del Corazón',
    subtitle: 'Encuentro Íntimo de Presencia, Límites & Devoción',
    dates: '28 — 30 Noviembre 2026',
    location: 'Valle de Bravo, Estado de México',
    spotsLeft: 2,
    totalSpots: 10,
    priceTag: 'Últimos Lugares',
    image: '/images/exp_tantra.jpg',
    highlights: [
      'Desarme de corazas en el centro Anahata',
      'Polaridad Shiva & Shakti guiada',
      'Tacto consciente y límites innegociables',
      'Círculo nocturno con fuego sagrado'
    ],
    waMessage: 'Hola Sofía, deseo solicitar información y reservar mi espacio para la Inmersión de Tantra & Polaridad en Valle de Bravo.'
  },
  {
    id: 'retiro-riviera',
    title: 'Alquimia de los Siete Vórtices',
    subtitle: 'Viaje Sagrado de Integración Energética y Mar',
    dates: '12 — 16 Diciembre 2026',
    location: 'Santuario Maya, Tulum / Quintana Roo',
    spotsLeft: 4,
    totalSpots: 14,
    priceTag: 'Convocatoria Abierta',
    image: '/images/community_circle.jpg',
    highlights: [
      'Recorrido de los 7 centros energéticos',
      'Inmersión en cenotes sagrados & sonido 432 Hz',
      'Sesión individual diagnóstica con Sofía',
      'Ronda de integración final al atardecer'
    ],
    waMessage: 'Hola Sofía, me interesa unirme al Retiro Alquimia de los Siete Vórtices en la Riviera Maya.'
  }
];

export const RetreatsGrid: React.FC = () => {
  // Parallax 3D Card Hover Effect state
  const [cardTransforms, setCardTransforms] = useState<Record<string, string>>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7; // max 7 deg
    const rotateY = ((x - centerX) / centerX) * 7;

    setCardTransforms((prev) => ({
      ...prev,
      [id]: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    }));
  };

  const handleMouseLeave = (id: string) => {
    setCardTransforms((prev) => ({
      ...prev,
      [id]: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }));
  };

  return (
    <div className="retreats-grid-container">
      <div className="retreats-header-meta">
        <div>
          <span className="retreats-eyebrow">Convocatorias Oficiales 2026</span>
          <h3 className="retreats-title">Retiros & Inmersiones de Conciencia</h3>
        </div>
        <div className="retreats-security-badge">
          <ShieldCheck size={16} className="gold-icon" />
          <span>Filtro previo de resonancia para cuidar el contenedor</span>
        </div>
      </div>

      <div className="retreats-cards-list">
        {RETREATS.map((retreat) => {
          const transformStyle = cardTransforms[retreat.id] || 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
          const encodedMessage = encodeURIComponent(retreat.waMessage);
          const waUrl = `https://wa.me/5215512345678?text=${encodedMessage}`;

          return (
            <article
              key={retreat.id}
              className="retreat-card-3d"
              style={{ transform: transformStyle }}
              onMouseMove={(e) => handleMouseMove(e, retreat.id)}
              onMouseLeave={() => handleMouseLeave(retreat.id)}
            >
              {/* Image Cover with Gradient Overlay */}
              <div className="retreat-card-media">
                <img src={retreat.image} alt={retreat.title} className="retreat-card-img" loading="lazy" />
                <div className="retreat-card-overlay" />
                <span className="retreat-spots-badge">
                  {retreat.spotsLeft} de {retreat.totalSpots} cupos libres
                </span>
              </div>

              {/* Card Body */}
              <div className="retreat-card-content">
                <div className="retreat-dates-row">
                  <div className="meta-item">
                    <Calendar size={13} className="gold-icon" />
                    <span>{retreat.dates}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin size={13} className="gold-icon" />
                    <span>{retreat.location}</span>
                  </div>
                </div>

                <h4 className="retreat-item-title">{retreat.title}</h4>
                <div className="retreat-item-sub">{retreat.subtitle}</div>

                {/* Highlights List */}
                <ul className="retreat-highlights-list">
                  {retreat.highlights.map((h, i) => (
                    <li key={i}>
                      <span className="gold-bullet">✦</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Direct WhatsApp CTA Button */}
                <div className="retreat-card-footer">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary retreat-wa-btn"
                  >
                    <span>Postular por WhatsApp</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

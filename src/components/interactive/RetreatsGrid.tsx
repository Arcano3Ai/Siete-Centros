import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { getStoredLanguage, Language } from '../../i18n/translations';

interface RetreatItem {
  id: string;
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  dates: { es: string; en: string };
  location: { es: string; en: string };
  spotsLeft: number;
  totalSpots: number;
  priceTag: { es: string; en: string };
  image: string;
  highlights: { es: string[]; en: string[] };
  waMessage: { es: string; en: string };
}

const RETREATS: RetreatItem[] = [
  {
    id: 'retiro-tepoztlan',
    title: {
      es: 'Silencio & Renacer Somático',
      en: 'Silence & Somatic Rebirth'
    },
    subtitle: {
      es: 'Inmersión de 4 Días entre Montañas Volcánicas',
      en: '4-Day Immersion among Sacred Volcanic Ridges'
    },
    dates: {
      es: '18 — 21 Junio 2026',
      en: 'June 18 — 21, 2026'
    },
    location: {
      es: 'Santuario de Tepoztlán, Morelos',
      en: 'Tepoztlán Sanctuary, Morelos'
    },
    spotsLeft: 3,
    totalSpots: 12,
    priceTag: { es: 'Cupo Limitado', en: 'Limited Vessel' },
    image: './images/exp_kriya.jpg',
    highlights: {
      es: [
        'Kriya Yoga matutino al amanecer en el loto',
        'Breathwork somático de descompresión profunda',
        'Ceremonia de cacao & palabra consciente',
        'Hospedaje boutique y alimentación botánica'
      ],
      en: [
        'Morning Kriya Yoga at dawn',
        'Deep somatic decompression breathwork',
        'Sacred cacao ceremony & conscious council',
        'Boutique sanctuary lodging & organic Ayurvedic dining'
      ]
    },
    waMessage: {
      es: 'Hola Sofía, deseo postularme para reservar uno de los últimos 3 lugares en el Retiro Silencio & Renacer Somático en Tepoztlán.',
      en: 'Hello Sofia, I would like to apply for one of the last 3 spots for the Silence & Somatic Rebirth Retreat in Tepoztlan.'
    }
  },
  {
    id: 'retiro-valle',
    title: {
      es: 'Tantra & Polaridad del Corazón',
      en: 'Tantra & Heart Polarity'
    },
    subtitle: {
      es: 'Encuentro Íntimo de Presencia, Límites & Devoción',
      en: 'Intimate Gathering of Presence, Boundaries & Devotion'
    },
    dates: {
      es: '24 — 27 Septiembre 2026',
      en: 'September 24 — 27, 2026'
    },
    location: {
      es: 'Bosque de Niebla, Valle de Bravo',
      en: 'Cloud Forest, Valle de Bravo'
    },
    spotsLeft: 2,
    totalSpots: 10,
    priceTag: { es: 'Últimos Lugares', en: 'Last 2 Spots' },
    image: './images/exp_tantra.jpg',
    highlights: {
      es: [
        'Desarme de corazas en el centro Anahata',
        'Polaridad Shiva & Shakti guiada en respeto',
        'Tacto consciente y límites innegociables',
        'Círculo nocturno con fuego sagrado'
      ],
      en: [
        'Dissolving somatic armoring around Anahata',
        'Guided Shiva & Shakti polarity practices',
        'Conscious non-demanding touch and boundary work',
        'Night council by the ceremonial bonfire'
      ]
    },
    waMessage: {
      es: 'Hola Sofía, deseo solicitar información y reservar mi espacio para la Inmersión de Tantra & Polaridad en Valle de Bravo.',
      en: 'Hello Sofia, I would like to inquire and reserve my place for the Tantra & Heart Polarity Immersion in Valle de Bravo.'
    }
  },
  {
    id: 'retiro-riviera',
    title: {
      es: 'Portal Ouroboros & Integración',
      en: 'Ouroboros Portal & Integration'
    },
    subtitle: {
      es: 'Viaje Sagrado de Reintegración Energética y Mar',
      en: 'Sacred Coastal Immersion of Full Cellular Integration'
    },
    dates: {
      es: '12 — 16 Noviembre 2026',
      en: 'November 12 — 16, 2026'
    },
    location: {
      es: 'Santuario Maya, Tulum / Quintana Roo',
      en: 'Mayan Sanctuary, Tulum / Quintana Roo'
    },
    spotsLeft: 4,
    totalSpots: 14,
    priceTag: { es: 'Convocatoria Abierta', en: 'Applications Open' },
    image: './images/community_circle.jpg',
    highlights: {
      es: [
        'Recorrido de los 7 centros energéticos',
        'Inmersión en cenotes sagrados & sonido armónico',
        'Sesión individual diagnóstica con Sofía',
        'Ronda de integración final al atardecer'
      ],
      en: [
        'Full journey across all 7 energy centers',
        'Sacred cenote water rebirthing & sound healing',
        '1-on-1 diagnostic somatic intake with Sofia',
        'Sunset graduation circle by the Caribbean'
      ]
    },
    waMessage: {
      es: 'Hola Sofía, me interesa unirme al Retiro Portal Ouroboros en Tulum.',
      en: 'Hello Sofia, I am interested in joining the Ouroboros Portal Retreat in Tulum.'
    }
  }
];

export const RetreatsGrid: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>(getStoredLanguage());
  const [cardTransforms, setCardTransforms] = useState<Record<string, string>>({});

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

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
          <span className="retreats-eyebrow">
            {currentLang === 'es' ? 'Convocatorias Oficiales 2026' : 'Official 2026 Immersions'}
          </span>
          <h3 className="retreats-title">
            {currentLang === 'es'
              ? 'Retiros & Inmersiones de Conciencia'
              : 'Consciousness Retreats & Sanctuary Immersions'}
          </h3>
        </div>
        <div className="retreats-security-badge">
          <ShieldCheck size={16} className="gold-icon" />
          <span>
            {currentLang === 'es'
              ? 'Filtro previo de resonancia para cuidar el contenedor'
              : 'Resonance pre-screening to protect the container'}
          </span>
        </div>
      </div>

      <div className="retreats-cards-list">
        {RETREATS.map((retreat) => {
          const transformStyle = cardTransforms[retreat.id] || 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
          const encodedMessage = encodeURIComponent(retreat.waMessage[currentLang]);
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
                <img src={retreat.image} alt={retreat.title[currentLang]} className="retreat-card-img" loading="lazy" />
                <div className="retreat-card-overlay" />
                <span className="retreat-spots-badge">
                  {currentLang === 'es'
                    ? `${retreat.spotsLeft} de ${retreat.totalSpots} cupos libres`
                    : `${retreat.spotsLeft} of ${retreat.totalSpots} spots left`}
                </span>
              </div>

              {/* Card Body */}
              <div className="retreat-card-content">
                <div className="retreat-dates-row">
                  <div className="meta-item">
                    <Calendar size={13} className="gold-icon" />
                    <span>{retreat.dates[currentLang]}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin size={13} className="gold-icon" />
                    <span>{retreat.location[currentLang]}</span>
                  </div>
                </div>

                <h4 className="retreat-item-title">{retreat.title[currentLang]}</h4>
                <div className="retreat-item-sub">{retreat.subtitle[currentLang]}</div>

                {/* Highlights List */}
                <ul className="retreat-highlights-list">
                  {retreat.highlights[currentLang].map((h, i) => (
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
                    <span>
                      {currentLang === 'es' ? 'Postular por WhatsApp' : 'Apply via WhatsApp'}
                    </span>
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

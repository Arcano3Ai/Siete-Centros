import React, { useState, useEffect } from 'react';
import { Flame, Users, Sparkles, MessageCircle, ArrowRight, Quote } from 'lucide-react';
import { getStoredLanguage, Language } from '../../i18n/translations';

interface VoiceTestimonial {
  id: number;
  author: string;
  role: { es: string; en: string };
  location: string;
  text: { es: string; en: string };
  highlight: { es: string; en: string };
}

const VOICES: VoiceTestimonial[] = [
  {
    id: 1,
    author: 'Camila Rosales',
    role: { es: 'Participante Círculo de Luna', en: 'Moon Circle Participant' },
    location: 'Tepoztlán, Morelos',
    text: {
      es: 'Entrar a la ronda fue desarmarme por completo. Frente al fuego sagrado y con la contención que sostiene Sofía, pude nombrar dolores que nunca antes tuvieron voz sin sentirme juzgada ni una sola vez.',
      en: 'Stepping into the circle stripped away all pretense. Before the sacred fire and held in Sofia\'s immaculate presence, I could name wounds that never had a voice without experiencing a shred of judgment.'
    },
    highlight: {
      es: '«Un antes y un después en mi relación con el cuerpo y la presencia»',
      en: '«A profound turning point in my intimacy with my body and presence»'
    }
  },
  {
    id: 2,
    author: 'Mateo Valenzuela',
    role: { es: 'Retiro Alquimia de los Siete Vórtices', en: 'Seven Vortices Alchemy Retreat' },
    location: 'CDMX',
    text: {
      es: 'Como hombre, los espacios para abrir la vulnerabilidad son escasos. En Siete Centros encontré una fraternidad sobria, devocional y profundamente enraizada que me devolvió a mi centro.',
      en: 'As a man, true spaces for somatic vulnerability are exceedingly rare. At Siete Centros I found a grounded, devotionally rooted brotherhood that returned me to my center.'
    },
    highlight: {
      es: '«Pude soltar corazas que cargaba por años sin saberlo»',
      en: '«I released armoring I had carried for years without knowing it»'
    }
  },
  {
    id: 3,
    author: 'Elena Domínguez',
    role: { es: 'Sesión Somática & Círculo de Palabra', en: 'Somatic Session & Word Circle' },
    location: 'Guadalajara, Jalisco',
    text: {
      es: 'La palabra dicha en presencia compartida alumbra rincones que el intelecto no alcanza. Cada encuentro es una medicina del silencio y la escucha.',
      en: 'The spoken truth in shared presence illuminates recesses that the intellect cannot touch. Every gathering is a deep medicine of silence and pure listening.'
    },
    highlight: {
      es: '«La palabra dicha sin juicio alumbra lo que el intelecto no alcanza»',
      en: '«Spoken truth without judgment illuminates what the intellect cannot reach»'
    }
  },
  {
    id: 4,
    author: 'Sebastián Morales',
    role: { es: 'Inmersión Kriya & Breathwork', en: 'Kriya & Breathwork Immersion' },
    location: 'Valle de Bravo',
    text: {
      es: 'El fuego nos iguala a todos. En esa ronda no hay jerarquías ni máscaras sociales, solo almas respirando al unísono y recordando la inocencia primordial.',
      en: 'The fire equals us all. In that sacred circle there are no hierarchies or social masks—only souls breathing in unison and remembering original innocence.'
    },
    highlight: {
      es: '«Una experiencia de verdad descarnada y sagrada»',
      en: '«An experience of raw, sacred, and grounded truth»'
    }
  }
];

export const WordCircle: React.FC = () => {
  const [activeVoiceId, setActiveVoiceId] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [currentLang, setCurrentLang] = useState<Language>(getStoredLanguage());

  const activeVoice = VOICES.find((v) => v.id === activeVoiceId) || VOICES[0];

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

  // Auto-rotate every 6 seconds unless paused by user interaction
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setActiveVoiceId((prev) => (prev % VOICES.length) + 1);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  return (
    <div className="word-circle-container">
      {/* Top Header */}
      <div className="word-circle-header">
        <div className="word-circle-badge">
          <Flame size={14} className="gold-flame" />
          <span>
            {currentLang === 'es'
              ? 'El Fuego Sagrado · Ronda de Palabra'
              : 'The Sacred Fire · Word Circle Council'}
          </span>
        </div>
        <div className="word-circle-capacity">
          <Users size={14} />
          <span>
            {currentLang === 'es'
              ? 'Contenedor Íntimo · Máx 12 Presencias'
              : 'Intimate Vessel · Max 12 Presences'}
          </span>
        </div>
      </div>

      {/* Central Fire & Gathering Seats Round Stage */}
      <div
        className="fire-stage-wrapper"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Animated Central Sacred Campfire Core */}
        <div className="sacred-fire-center">
          <div className="fire-core-glow" />
          <div className="fire-flame-orb" />
          <div className="fire-sparkles-wrap">
            <span className="sparkle s1" />
            <span className="sparkle s2" />
            <span className="sparkle s3" />
            <span className="sparkle s4" />
          </div>
          <div className="fire-label">
            <Flame size={18} className="center-flame-icon" />
            <span>{currentLang === 'es' ? 'Fuego Central' : 'Sacred Fire'}</span>
          </div>
        </div>

        {/* 4 Gathering Seats Surrounding the Fire */}
        {VOICES.map((voice, idx) => {
          const isCurrent = voice.id === activeVoiceId;
          const angles = [0, 90, 180, 270];
          const angleRad = (angles[idx] * Math.PI) / 180;
          const radius = 110;
          const x = Math.cos(angleRad) * radius;
          const y = Math.sin(angleRad) * radius;

          return (
            <button
              key={voice.id}
              type="button"
              className={`fire-seat-btn ${isCurrent ? 'active' : ''}`}
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
              }}
              onClick={() => {
                setActiveVoiceId(voice.id);
                setIsAutoPlaying(false);
              }}
              aria-label={`Voz de ${voice.author}`}
            >
              <span className="seat-orb" />
              <span className="seat-name">{voice.author.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Testimonial Active Body Card */}
      <div className="voice-card-body">
        <div className="voice-card-top">
          <Quote size={20} className="gold-quote-icon" />
          <div className="voice-author-group">
            <h4 className="voice-author-name">{activeVoice.author}</h4>
            <div className="voice-author-meta">
              <span>{activeVoice.role[currentLang]}</span> · <span>{activeVoice.location}</span>
            </div>
          </div>
        </div>

        <div className="voice-highlight-quote">{activeVoice.highlight[currentLang]}</div>
        <p className="voice-full-text">«{activeVoice.text[currentLang]}»</p>

        {/* Voice Selector Indicators */}
        <div className="voice-pills-row">
          {VOICES.map((v) => (
            <button
              key={v.id}
              type="button"
              className={`voice-pill-dot ${v.id === activeVoiceId ? 'active' : ''}`}
              onClick={() => {
                setActiveVoiceId(v.id);
                setIsAutoPlaying(false);
              }}
              aria-label={`Testimonio ${v.id}`}
            />
          ))}
        </div>
      </div>

      {/* WhatsApp Preconfigured CTA */}
      <div className="word-circle-cta">
        <a
          href="https://wa.me/5215512345678?text=Hola%20Sof%C3%ADa%2C%20deseo%20unirme%20al%20pr%C3%B3ximo%20C%C3%ADrculo%20de%20Palabra%20y%20Presencia%20en%20Siete%20Centros%20Escuela%20de%20Conciencia"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary circle-action-btn"
        >
          <MessageCircle size={16} />
          <span>
            {currentLang === 'es'
              ? 'Reservar Lugar en el Próximo Círculo'
              : 'Reserve Seat in Upcoming Circle'}
          </span>
          <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
};

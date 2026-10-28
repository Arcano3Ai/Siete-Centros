import React, { useState, useEffect } from 'react';
import { Flame, Users, Sparkles, MessageCircle, ArrowRight, Quote } from 'lucide-react';

interface VoiceTestimonial {
  id: number;
  author: string;
  role: string;
  location: string;
  text: string;
  highlight: string;
}

const VOICES: VoiceTestimonial[] = [
  {
    id: 1,
    author: 'Camila Rosales',
    role: 'Participante Círculo de Luna',
    location: 'Tepoztlán, Morelos',
    text: 'Entrar a la ronda fue desarmarme por completo. Frente al fuego sagrado y con la contención que sostiene Sofía, pude nombrar dolores que nunca antes tuvieron voz sin sentirme juzgada ni una sola vez.',
    highlight: '«Un antes y un después en mi relación con el cuerpo y la presencia»'
  },
  {
    id: 2,
    author: 'Mateo Valenzuela',
    role: 'Retiro Alquimia de los Siete Vórtices',
    location: 'CDMX',
    text: 'Como hombre, los espacios para abrir la vulnerabilidad son escasos. En Siete Centros encontré una fraternidad sobria, devocional y profundamente enraizada que me devolvió a mi centro.',
    highlight: '«Pude soltar corazas que cargaba por años sin saberlo»'
  },
  {
    id: 3,
    author: 'Elena Domínguez',
    role: 'Sesión Somática & Círculo de Palabra',
    location: 'Guadalajara, Jalisco',
    text: 'La palabra dicha en presencia compartida alumbra rincones que el intelecto no alcanza. Cada encuentro es una medicina del silencio y la escucha.',
    highlight: '«La palabra dicha sin juicio alumbra lo que el intelecto no alcanza»'
  },
  {
    id: 4,
    author: 'Sebastián Morales',
    role: 'Inmersión Kriya & Breathwork',
    location: 'Valle de Bravo',
    text: 'El fuego nos iguala a todos. En esa ronda no hay jerarquías ni máscaras sociales, solo almas respirando al unísono y recordando la inocencia primordial.',
    highlight: '«Una experiencia de verdad descarnada y sagrada»'
  }
];

export const WordCircle: React.FC = () => {
  const [activeVoiceId, setActiveVoiceId] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const activeVoice = VOICES.find((v) => v.id === activeVoiceId) || VOICES[0];

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
          <span>El Fuego Sagrado · Ronda de Palabra</span>
        </div>
        <div className="word-circle-capacity">
          <Users size={14} />
          <span>Contenedor Íntimo · Máx 12 Presencias</span>
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
            <span>Fuego Central</span>
          </div>
        </div>

        {/* 4 Gathering Seats Surrounding the Fire */}
        {VOICES.map((voice, idx) => {
          const isCurrent = voice.id === activeVoiceId;
          const angles = [0, 90, 180, 270]; // 4 cardinals around the circle
          const angleRad = (angles[idx] * Math.PI) / 180;
          const radius = 110; // px
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
              aria-label={`Escuchar voz de ${voice.author}`}
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
              <span>{activeVoice.role}</span> · <span>{activeVoice.location}</span>
            </div>
          </div>
        </div>

        <div className="voice-highlight-quote">{activeVoice.highlight}</div>
        <p className="voice-full-text">«{activeVoice.text}»</p>

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
          href="https://wa.me/5215512345678?text=Hola%20Sof%C3%ADa%2C%20deseo%20unirme%20al%20pr%C3%B3ximo%20C%C3%ADrculo%20de%20Palabra%20y%20Presencia%20en%20Siete%20Centros"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary circle-action-btn"
        >
          <MessageCircle size={16} />
          <span>Reservar Lugar en el Próximo Círculo</span>
          <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
};

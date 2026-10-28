import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, Activity, Volume2, Shield } from 'lucide-react';
import { getStoredLanguage, Language } from '../../i18n/translations';

interface ChakraData {
  id: number;
  numeral: string;
  name: { es: string; en: string };
  sanskrit: string;
  element: { es: string; en: string };
  color: string;
  frequency: number; // Hz Solfeggio
  mantra: string;
  location: { es: string; en: string };
  exercise: { es: string; en: string };
  exerciseDuration: { es: string; en: string };
  affirmation: { es: string; en: string };
}

const CHAKRAS_KRIYA: ChakraData[] = [
  {
    id: 7,
    numeral: 'VII',
    name: { es: 'Corona', en: 'Crown' },
    sanskrit: 'Sahasrara',
    element: { es: 'Espacio Cósmico / Trascendencia', en: 'Cosmic Space / Transcendence' },
    color: '#C084FC',
    frequency: 963,
    mantra: 'SILENCIO (OM)',
    location: { es: 'Coronilla del cráneo', en: 'Crown of the head' },
    exercise: {
      es: 'Cierra los párpados. Lleva la atención 10 cm arriba de tu coronilla. Imagina una flor de loto de mil pétalos abriéndose a la luz blanca inmóvil.',
      en: 'Close your eyes. Focus your awareness 10 cm above your crown. Envision a thousand-petal lotus opening to motionless white radiance.'
    },
    exerciseDuration: { es: '2 minutos de quietud pura', en: '2 minutes of pure stillness' },
    affirmation: {
      es: '«Soy la conciencia ilimitada donde todo acontece»',
      en: '«I am the limitless awareness within which all arises»'
    }
  },
  {
    id: 6,
    numeral: 'VI',
    name: { es: 'Tercer Ojo', en: 'Third Eye' },
    sanskrit: 'Ajna',
    element: { es: 'Luz & Discernimiento', en: 'Light & Discernment' },
    color: '#818CF8',
    frequency: 852,
    mantra: 'KSHAM / OM',
    location: { es: 'Entrecejo, centro del cerebro', en: 'Brow point, brain center' },
    exercise: {
      es: 'Fija la mirada interna en el entrecejo (Shambhavi Mudra) con respiración nasal lenta y profunda, sin forzar los ojos.',
      en: 'Fix your internal gaze upon the brow point (Shambhavi Mudra) with slow, deep nasal breath without eye strain.'
    },
    exerciseDuration: { es: '1 minuto de enfoque sereno', en: '1 minute of serene focus' },
    affirmation: {
      es: '«Confío en la sabiduría silenciosa de mi visión interior»',
      en: '«I trust the silent wisdom of my inner vision»'
    }
  },
  {
    id: 5,
    numeral: 'V',
    name: { es: 'Garganta', en: 'Throat' },
    sanskrit: 'Vishuddha',
    element: { es: 'Éter / Sonido Sagrado', en: 'Ether / Sacred Sound' },
    color: '#38BDF8',
    frequency: 741,
    mantra: 'HAM',
    location: { es: 'Garganta y tiroides', en: 'Throat & thyroid gland' },
    exercise: {
      es: 'Inhala por la nariz. Al exhalar, produce un suave zumbido de abeja (Bhramari Pranayama) sintiendo la vibración en el paladar y las cuerdas vocales.',
      en: 'Inhale through the nose. On exhale, produce a gentle humming bee sound (Bhramari Pranayama) feeling resonance in the palate.'
    },
    exerciseDuration: { es: '5 exhalaciones conscientes', en: '5 mindful breath cycles' },
    affirmation: {
      es: '«Mi voz es el puente honesto de mi verdad esencial»',
      en: '«My voice is the sacred bridge to my core truth»'
    }
  },
  {
    id: 4,
    numeral: 'IV',
    name: { es: 'Corazón', en: 'Heart' },
    sanskrit: 'Anahata',
    element: { es: 'Aire / Compasión Incondicional', en: 'Air / Unconditional Love' },
    color: '#34D399',
    frequency: 639,
    mantra: 'YAM',
    location: { es: 'Centro del pecho', en: 'Center of the chest' },
    exercise: {
      es: 'Coloca ambas palmas sobre el esternón. Siente la calidez del pulso cardíaco y exhala un suspiro de alivio desarmando cualquier coraza pectoral.',
      en: 'Rest both palms over the sternum. Feel the warmth of your heartbeat and exhale with a sigh of relief, dissolving armoring.'
    },
    exerciseDuration: { es: '8 respiraciones compasivas', en: '8 compassionate breaths' },
    affirmation: {
      es: '«Habito un amor que no exige condiciones para ser»',
      en: '«I inhabit a love that requires no conditions to exist»'
    }
  },
  {
    id: 3,
    numeral: 'III',
    name: { es: 'Plexo Solar', en: 'Solar Plexus' },
    sanskrit: 'Manipura',
    element: { es: 'Fuego / Voluntad Serena', en: 'Fire / Serene Willpower' },
    color: '#FBBF24',
    frequency: 528,
    mantra: 'RAM',
    location: { es: 'Encima del ombligo', en: 'Above the navel' },
    exercise: {
      es: 'Realiza 15 pulsaciones suaves del abdomen (Kapalabhati suave) despertando el fuego digestivo pránico y la soberanía del plexo.',
      en: 'Perform 15 gentle abdominal pulses (gentle Kapalabhati) igniting your digestive prana and personal sovereignty.'
    },
    exerciseDuration: { es: '1 minuto de activación', en: '1 minute of activation' },
    affirmation: {
      es: '«Mi fuego interior transmuta la duda en acción lúcida»',
      en: '«My inner fire transmutes hesitation into lucid clarity»'
    }
  },
  {
    id: 2,
    numeral: 'II',
    name: { es: 'Sacro', en: 'Sacral' },
    sanskrit: 'Svadhisthana',
    element: { es: 'Agua / Fluidez y Sensualidad', en: 'Water / Fluid Sensuality' },
    color: '#FB923C',
    frequency: 417,
    mantra: 'VAM',
    location: { es: 'Bajo vientre y pelvis', en: 'Lower abdomen and pelvis' },
    exercise: {
      es: 'Sentado cómodamente, realiza suaves círculos pélvicos en el sentido de las manecillas del reloj, soltando el control y relajando el suelo pélvico.',
      en: 'Seated comfortably, make gentle clockwise pelvic circles, letting go of rigidity and softening your pelvic floor.'
    },
    exerciseDuration: { es: '10 rotaciones suaves', en: '10 gentle rotations' },
    affirmation: {
      es: '«Me permito sentir, fluir y gozar la corriente de la vida»',
      en: '«I grant myself permission to feel, flow, and enjoy life\'s pulse»'
    }
  },
  {
    id: 1,
    numeral: 'I',
    name: { es: 'Raíz', en: 'Root' },
    sanskrit: 'Muladhara',
    element: { es: 'Tierra / Seguridad Biológica', en: 'Earth / Biological Safety' },
    color: '#F43F5E',
    frequency: 396,
    mantra: 'LAM',
    location: { es: 'Perineo y base de la columna', en: 'Perineum and base of spine' },
    exercise: {
      es: 'Contrae suavemente el perineo (Mula Bandha) al inhalar y suelta profundamente al exhalar, imaginando raíces volcánicas anclándose a la tierra.',
      en: 'Gently engage the perineum (Mula Bandha) on inhale, release fully on exhale, sensing roots anchoring deep into the bedrock.'
    },
    exerciseDuration: { es: '7 contracciones conscientes', en: '7 mindful engagements' },
    affirmation: {
      es: '«Tengo derecho a estar aquí; la tierra me sostiene»',
      en: '«I belong here; the earth fully holds me»'
    }
  }
];

export const KriyaSpine: React.FC = () => {
  const [activeChakraId, setActiveChakraId] = useState<number>(4); // Default: Anahata
  const [currentLang, setCurrentLang] = useState<Language>(getStoredLanguage());
  const [isPlayingMantra, setIsPlayingMantra] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

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

  const activeChakra = CHAKRAS_KRIYA.find((c) => c.id === activeChakraId) || CHAKRAS_KRIYA[3];

  const playChakraTone = (hz: number) => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(hz, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.16, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.6);

      setIsPlayingMantra(true);
      setTimeout(() => setIsPlayingMantra(false), 2400);
    } catch {
      // Graceful fallback
    }
  };

  return (
    <div className="kriya-spine-container">
      <div className="kriya-spine-grid">
        {/* Left Column: Stylized Sushumna Spine Rail with Interactive Nodes & Kundalini Currents */}
        <div className="spine-rail-column">
          <div className="spine-rail-axis">
            {/* Eje Sushumna Central Dorado */}
            <div className="spine-rail-line" />

            {/* Espirales Entrelazadas Ida (Lunar) y Pingala (Solar) */}
            <svg className="spine-kundalini-svg" viewBox="0 0 40 320" fill="none" aria-hidden="true">
              <path
                d="M 20 10 Q 38 50, 20 90 Q 2 130, 20 170 Q 38 210, 20 250 Q 2 290, 20 310"
                stroke="rgba(223, 190, 144, 0.35)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <path
                d="M 20 10 Q 2 50, 20 90 Q 38 130, 20 170 Q 2 210, 20 250 Q 38 290, 20 310"
                stroke="rgba(192, 132, 252, 0.35)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            </svg>

            {/* Resplandor Activo de la Energía Ascendente */}
            <div
              className="spine-rail-glow"
              style={{
                top: `${((7 - activeChakra.id) / 6) * 100}%`,
                backgroundColor: activeChakra.color,
                boxShadow: `0 0 25px ${activeChakra.color}`
              }}
            />

            {CHAKRAS_KRIYA.map((chakra) => {
              const isSelected = chakra.id === activeChakraId;
              return (
                <button
                  key={chakra.id}
                  type="button"
                  className={`spine-node-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    setActiveChakraId(chakra.id);
                    playChakraTone(chakra.frequency);
                  }}
                  onMouseEnter={() => setActiveChakraId(chakra.id)}
                  aria-label={`Centro ${chakra.numeral} ${chakra.name[currentLang]}`}
                  style={{
                    borderColor: isSelected ? chakra.color : 'rgba(197, 168, 128, 0.25)',
                    backgroundColor: isSelected ? 'rgba(5, 5, 8, 0.95)' : 'rgba(10, 6, 16, 0.7)'
                  }}
                >
                  <span
                    className="spine-node-core"
                    style={{
                      backgroundColor: chakra.color,
                      transform: isSelected ? 'scale(1.55)' : 'scale(1)',
                      boxShadow: isSelected ? `0 0 16px ${chakra.color}` : 'none'
                    }}
                  />
                  <span className="spine-node-label">{chakra.numeral}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Floating Card with Sacred Geometry & Guided Somatics */}
        <div className="kriya-detail-card-panel">
          <div
            className="kriya-floating-card"
            style={{
              borderColor: `${activeChakra.color}66`,
              boxShadow: `0 24px 60px rgba(0,0,0,0.85), 0 0 35px ${activeChakra.color}25`
            }}
          >
            {/* Header Meta */}
            <div className="kriya-card-header">
              <div className="kriya-meta-tags">
                <span className="kriya-pill-numeral" style={{ color: activeChakra.color }}>
                  {currentLang === 'es' ? 'CENTRO' : 'CENTER'} {activeChakra.numeral}
                </span>
                <span className="kriya-pill-sanskrit">{activeChakra.sanskrit}</span>
              </div>
              <span className="kriya-element-tag">{activeChakra.element[currentLang]}</span>
            </div>

            <h3 className="kriya-chakra-name">{activeChakra.name[currentLang]}</h3>
            <div className="kriya-chakra-location">
              {currentLang === 'es' ? 'Ubicación' : 'Location'}: {activeChakra.location[currentLang]}
            </div>

            {/* Sacred Mantra & Frequency Banner with Audio Chime */}
            <div
              className={`kriya-mantra-box ${isPlayingMantra ? 'is-playing' : ''}`}
              style={{ borderColor: `${activeChakra.color}44` }}
              onClick={() => playChakraTone(activeChakra.frequency)}
              role="button"
              tabIndex={0}
              title={currentLang === 'es' ? 'Click para entonar frecuencia' : 'Click to tone sacred frequency'}
            >
              <div className="mantra-left">
                <span className="mantra-label">
                  {currentLang === 'es' ? 'Bīja Mantra Sagrado & Tono Solfeggio' : 'Sacred Bīja Mantra & Solfeggio'}
                </span>
                <span className="mantra-value" style={{ color: activeChakra.color }}>
                  {activeChakra.mantra} · {activeChakra.frequency} Hz
                </span>
              </div>
              <div className="mantra-audio-icon-wrap" style={{ color: activeChakra.color }}>
                <Volume2 size={20} />
              </div>
            </div>

            {/* Guided Mini Somatic Exercise */}
            <div className="kriya-exercise-section">
              <div className="exercise-header">
                <Activity size={15} style={{ color: activeChakra.color }} />
                <span>{currentLang === 'es' ? 'Práctica Somática Guiada' : 'Guided Somatic Practice'}</span>
              </div>
              <p className="exercise-instructions">{activeChakra.exercise[currentLang]}</p>
              <div className="exercise-duration">⏱ {activeChakra.exerciseDuration[currentLang]}</div>
            </div>

            {/* Affirmation Quote */}
            <blockquote className="kriya-affirmation" style={{ borderLeftColor: activeChakra.color }}>
              {activeChakra.affirmation[currentLang]}
            </blockquote>

            {/* Action CTA preconfigured to WhatsApp */}
            <div className="kriya-card-footer">
              <a
                href={`https://wa.me/5215512345678?text=Hola%20Sof%C3%ADa%2C%20deseo%20profundizar%20en%20el%20alineamiento%20del%20Centro%20${activeChakra.numeral}%20${activeChakra.name.es}%20en%20Siete%20Centros%20Escuela%20de%20Conciencia`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary kriya-action-btn"
                style={{
                  background: `linear-gradient(135deg, ${activeChakra.color}, #C5A880)`,
                  color: '#050508'
                }}
              >
                <span>
                  {currentLang === 'es'
                    ? `Alinear Centro ${activeChakra.name.es} con Sofía`
                    : `Align ${activeChakra.name.en} Center with Sofia`}
                </span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Activity, Flame, Shield, Compass } from 'lucide-react';

interface ChakraData {
  id: number;
  numeral: string;
  name: string;
  sanskrit: string;
  element: string;
  color: string;
  mantra: string;
  location: string;
  exercise: string;
  exerciseDuration: string;
  affirmation: string;
}

const CHAKRAS_KRIYA: ChakraData[] = [
  {
    id: 7,
    numeral: 'VII',
    name: 'Corona',
    sanskrit: 'Sahasrara',
    element: 'Espacio Cósmico / Trascendencia',
    color: '#C084FC',
    mantra: 'SILENCIO (OM)',
    location: 'Coronilla del cráneo',
    exercise: 'Cierra los párpados. Lleva la atención 10 cm arriba de tu coronilla. Imagina una flor de loto de mil pétalos abriéndose a la luz blanca inmóvil.',
    exerciseDuration: '2 minutos de quietud pura',
    affirmation: '«Soy la conciencia ilimitada donde todo acontece»'
  },
  {
    id: 6,
    numeral: 'VI',
    name: 'Tercer Ojo',
    sanskrit: 'Ajna',
    element: 'Luz & Discernimiento',
    color: '#818CF8',
    mantra: 'KSHAM / OM',
    location: 'Entretiempo, centro del cerebro',
    exercise: 'Fija la mirada interna en el entrecejo (Shambhavi Mudra) con respiración nasal lenta y profunda, sin forzar los ojos.',
    exerciseDuration: '1 minuto de enfoque sereno',
    affirmation: '«Confío en la sabiduría silenciosa de mi visión interior»'
  },
  {
    id: 5,
    numeral: 'V',
    name: 'Garganta',
    sanskrit: 'Vishuddha',
    element: 'Éter / Sonido Sagrado',
    color: '#38BDF8',
    mantra: 'HAM',
    location: 'Garganta y tiroides',
    exercise: 'Inhala por la nariz. Al exhalar, produce un suave zumbido de abeja (Bhramari Pranayama) sintiendo la vibración en el paladar y las cuerdas vocales.',
    exerciseDuration: '5 exhalaciones conscientes',
    affirmation: '«Mi voz es el puente honesto de mi verdad esencial»'
  },
  {
    id: 4,
    numeral: 'IV',
    name: 'Corazón',
    sanskrit: 'Anahata',
    element: 'Aire / Compasión Incondicional',
    color: '#34D399',
    mantra: 'YAM',
    location: 'Centro del pecho',
    exercise: 'Coloca ambas palmas sobre el esternón. Siente la calidez del pulso cardíaco y exhala un suspiro de alivio desarmando cualquier coraza pectoral.',
    exerciseDuration: '8 respiraciones compasivas',
    affirmation: '«Habito un amor que no exige condiciones para ser»'
  },
  {
    id: 3,
    numeral: 'III',
    name: 'Plexo Solar',
    sanskrit: 'Manipura',
    element: 'Fuego / Voluntad Serena',
    color: '#FBBF24',
    mantra: 'RAM',
    location: 'Encima del ombligo',
    exercise: 'Realiza 15 pulsaciones suaves del abdomen (Kapalabhati suave) despertando el fuego digestivo pránico y la soberanía del plexo.',
    exerciseDuration: '1 minuto de activación',
    affirmation: '«Mi fuego interior transmuta la duda en acción lúcida»'
  },
  {
    id: 2,
    numeral: 'II',
    name: 'Sacro',
    sanskrit: 'Svadhisthana',
    element: 'Agua / Fluidez y Sensualidad',
    color: '#FB923C',
    mantra: 'VAM',
    location: 'Bajo vientre y pelvis',
    exercise: 'Sentado cómodamente, realiza suaves círculos pélvicos en el sentido de las manecillas del reloj, soltando el control y relajando el suelo pélvico.',
    exerciseDuration: '10 rotaciones suaves',
    affirmation: '«Me permito sentir, fluir y gozar la corriente de la vida»'
  },
  {
    id: 1,
    numeral: 'I',
    name: 'Raíz',
    sanskrit: 'Muladhara',
    element: 'Tierra / Seguridad Biológica',
    color: '#F43F5E',
    mantra: 'LAM',
    location: 'Perineo y base de la columna',
    exercise: 'Contrae suavemente el perineo (Mula Bandha) al inhalar y suelta profundamente al exhalar, imaginando raíces volcánicas anclándose a la tierra.',
    exerciseDuration: '7 contracciones y relajaciones',
    affirmation: '«Tengo derecho a estar aquí; la tierra me sostiene»'
  }
];

export const KriyaSpine: React.FC = () => {
  const [activeChakraId, setActiveChakraId] = useState<number>(4); // Default to Anahata Corazón

  const activeChakra = CHAKRAS_KRIYA.find((c) => c.id === activeChakraId) || CHAKRAS_KRIYA[3];

  return (
    <div className="kriya-spine-container">
      <div className="kriya-spine-grid">
        {/* Left Column: Stylized Sushumna Spine Rail with Interactive Nodes */}
        <div className="spine-rail-column">
          <div className="spine-rail-axis">
            <div className="spine-rail-line" />
            <div
              className="spine-rail-glow"
              style={{
                top: `${((7 - activeChakra.id) / 6) * 100}%`,
                backgroundColor: activeChakra.color,
                boxShadow: `0 0 20px ${activeChakra.color}`
              }}
            />

            {CHAKRAS_KRIYA.map((chakra) => {
              const isSelected = chakra.id === activeChakraId;
              return (
                <button
                  key={chakra.id}
                  type="button"
                  className={`spine-node-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => setActiveChakraId(chakra.id)}
                  onMouseEnter={() => setActiveChakraId(chakra.id)}
                  aria-label={`Seleccionar Centro ${chakra.numeral} ${chakra.name}`}
                  style={{
                    borderColor: isSelected ? chakra.color : 'rgba(197, 168, 128, 0.25)',
                    backgroundColor: isSelected ? 'rgba(5, 5, 8, 0.95)' : 'rgba(10, 6, 16, 0.65)'
                  }}
                >
                  <span
                    className="spine-node-core"
                    style={{
                      backgroundColor: chakra.color,
                      transform: isSelected ? 'scale(1.5)' : 'scale(1)',
                      boxShadow: isSelected ? `0 0 14px ${chakra.color}` : 'none'
                    }}
                  />
                  <span className="spine-node-label">{chakra.numeral}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Floating Floating Card with Sacred Geometry & Mini Exercise */}
        <div className="kriya-detail-card-panel">
          <div
            className="kriya-floating-card"
            style={{
              borderColor: `${activeChakra.color}55`,
              boxShadow: `0 20px 50px rgba(0,0,0,0.85), 0 0 30px ${activeChakra.color}22`
            }}
          >
            {/* Header Meta */}
            <div className="kriya-card-header">
              <div className="kriya-meta-tags">
                <span className="kriya-pill-numeral" style={{ color: activeChakra.color }}>
                  CENTRO {activeChakra.numeral}
                </span>
                <span className="kriya-pill-sanskrit">{activeChakra.sanskrit}</span>
              </div>
              <span className="kriya-element-tag">{activeChakra.element}</span>
            </div>

            <h3 className="kriya-chakra-name">{activeChakra.name}</h3>
            <div className="kriya-chakra-location">Ubicación: {activeChakra.location}</div>

            {/* Sacred Mantra & Frequency Banner */}
            <div className="kriya-mantra-box" style={{ borderColor: `${activeChakra.color}33` }}>
              <div className="mantra-left">
                <span className="mantra-label">Bija Mantra Sagrado</span>
                <span className="mantra-value" style={{ color: activeChakra.color }}>
                  {activeChakra.mantra}
                </span>
              </div>
              <Sparkles size={20} style={{ color: activeChakra.color }} />
            </div>

            {/* Guided Mini Somatic Exercise */}
            <div className="kriya-exercise-section">
              <div className="exercise-header">
                <Activity size={15} style={{ color: activeChakra.color }} />
                <span>Mini Ejercicio Somático Estático</span>
              </div>
              <p className="exercise-instructions">{activeChakra.exercise}</p>
              <div className="exercise-duration">⏱ {activeChakra.exerciseDuration}</div>
            </div>

            {/* Affirmation Quote */}
            <blockquote className="kriya-affirmation" style={{ borderLeftColor: activeChakra.color }}>
              {activeChakra.affirmation}
            </blockquote>

            {/* Action CTA preconfigured to WhatsApp */}
            <div className="kriya-card-footer">
              <a
                href={`https://wa.me/5215512345678?text=Hola%20Sof%C3%ADa%2C%20deseo%20profundizar%20en%20el%20alineamiento%20del%20Centro%20${activeChakra.numeral}%20${activeChakra.name}%20mediante%20Kriya%20Yoga%20en%20Siete%20Centros`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary kriya-action-btn"
                style={{
                  background: `linear-gradient(135deg, ${activeChakra.color}, #C5A880)`,
                  color: '#050508'
                }}
              >
                <span>Alinear Centro {activeChakra.name} con Sofía</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

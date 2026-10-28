import React, { useState } from 'react';
import { Wind, Activity, Infinity as InfinityIcon, Flame, Calendar, Sparkles } from 'lucide-react';
import { BreathworkOrbe } from './BreathworkOrbe.js';
import { KriyaSpine } from './KriyaSpine.js';
import { TantraPolarity } from './TantraPolarity.js';
import { WordCircle } from './WordCircle.js';
import { RetreatsGrid } from './RetreatsGrid.js';

export type ServiceTab = 'breathwork' | 'kriya' | 'tantra' | 'circulos' | 'retiros';

interface TabConfig {
  id: ServiceTab;
  label: string;
  sub: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const TABS: TabConfig[] = [
  {
    id: 'breathwork',
    label: 'Breathwork',
    sub: 'Orbe de Coherencia',
    icon: Wind
  },
  {
    id: 'kriya',
    label: 'Kriya Yoga',
    sub: 'Columna Sushumna',
    icon: Activity
  },
  {
    id: 'tantra',
    label: 'Tantra',
    sub: 'Polaridad Shiva & Shakti',
    icon: InfinityIcon
  },
  {
    id: 'circulos',
    label: 'Círculos de Palabra',
    sub: 'El Fuego Sagrado',
    icon: Flame
  },
  {
    id: 'retiros',
    label: 'Retiros 2026',
    sub: 'Inmersiones & Agenda',
    icon: Calendar
  }
];

export const ServicesInteractiveHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ServiceTab>('breathwork');

  return (
    <section className="services-interactive-hub-section" id="experiencias-interactivas" aria-label="Experiencias y Servicios Interactivos de Siete Centros">
      <div className="hub-header-container">
        <div className="hub-eyebrow">
          <Sparkles size={13} className="gold-icon" />
          <span>Alquimia Somática en Acción</span>
        </div>
        <h2 className="hub-main-title">PORTAL DE PRÁCTICAS & SERVICIOS</h2>
        <p className="hub-subtitle">
          «El conocimiento no integrado es solo información; la experiencia somática despierta la memoria celular».
        </p>

        {/* Master Tab Selector Bar */}
        <div className="hub-tabs-navigation" role="tablist" aria-label="Pestañas de Servicios">
          {TABS.map((tab) => {
            const IconComponent = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                className={`hub-nav-tab-btn ${isCurrent ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="tab-icon-wrap">
                  <IconComponent size={18} />
                </div>
                <div className="tab-text-group">
                  <span className="tab-label">{tab.label}</span>
                  <span className="tab-sub">{tab.sub}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dynamic Interactive Stage Container */}
      <div className="hub-active-stage-container">
        {activeTab === 'breathwork' && <BreathworkOrbe />}
        {activeTab === 'kriya' && <KriyaSpine />}
        {activeTab === 'tantra' && <TantraPolarity />}
        {activeTab === 'circulos' && <WordCircle />}
        {activeTab === 'retiros' && <RetreatsGrid />}
      </div>
    </section>
  );
};

export default ServicesInteractiveHub;

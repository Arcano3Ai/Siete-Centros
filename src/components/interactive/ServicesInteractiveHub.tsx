import React, { useState, useEffect } from 'react';
import { Wind, Activity, Infinity as InfinityIcon, Flame, Calendar, Sparkles } from 'lucide-react';
import { BreathworkOrbe } from './BreathworkOrbe.js';
import { KriyaSpine } from './KriyaSpine.js';
import { TantraPolarity } from './TantraPolarity.js';
import { WordCircle } from './WordCircle.js';
import { RetreatsGrid } from './RetreatsGrid.js';
import { getStoredLanguage, DICTIONARY, Language } from '../../i18n/translations';

export type ServiceTab = 'breathwork' | 'kriya' | 'tantra' | 'circulos' | 'retiros';

interface TabConfig {
  id: ServiceTab;
  label: { es: string; en: string };
  sub: { es: string; en: string };
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const TABS: TabConfig[] = [
  {
    id: 'breathwork',
    label: { es: 'Breathwork', en: 'Breathwork' },
    sub: { es: 'Inhala · Sostiene · Exhala', en: 'Inhale · Hold · Exhale' },
    icon: Wind
  },
  {
    id: 'kriya',
    label: { es: 'Kriya Yoga', en: 'Kriya Yoga' },
    sub: { es: 'Columna Sushumna & Mantras', en: 'Sushumna Spine & Mantras' },
    icon: Activity
  },
  {
    id: 'tantra',
    label: { es: 'Tantra', en: 'Tantra' },
    sub: { es: 'Polaridad Shiva & Shakti', en: 'Shiva & Shakti Polarity' },
    icon: InfinityIcon
  },
  {
    id: 'circulos',
    label: { es: 'Círculos de Palabra', en: 'Word Circles' },
    sub: { es: 'El Fuego Sagrado', en: 'The Sacred Fire' },
    icon: Flame
  },
  {
    id: 'retiros',
    label: { es: 'Retiros 2026', en: 'Retreats 2026' },
    sub: { es: 'Inmersiones & Agenda', en: 'Immersions & Schedule' },
    icon: Calendar
  }
];

const PAGE_URLS: Record<ServiceTab, { url: string; label: { es: string; en: string } }> = {
  breathwork: { url: '/breathwork.html', label: { es: 'Abrir Página Separada de Breathwork ↗', en: 'Open Dedicated Breathwork Page ↗' } },
  kriya: { url: '/kriya-yoga.html', label: { es: 'Abrir Página Separada de Kriya Yoga ↗', en: 'Open Dedicated Kriya Yoga Page ↗' } },
  tantra: { url: '/tantra.html', label: { es: 'Abrir Página Separada de Tantra ↗', en: 'Open Dedicated Tantra Page ↗' } },
  circulos: { url: '/circulos-de-palabra.html', label: { es: 'Abrir Página Separada de Círculos ↗', en: 'Open Dedicated Circles Page ↗' } },
  retiros: { url: '/retiros.html', label: { es: 'Abrir Página Separada de Retiros 2026 ↗', en: 'Open Dedicated Retreats Page ↗' } }
};

export const ServicesInteractiveHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ServiceTab>('breathwork');
  const [currentLang, setCurrentLang] = useState<Language>(getStoredLanguage());

  const t = DICTIONARY[currentLang];

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

  return (
    <section className="services-interactive-hub-section" id="experiencias-interactivas" aria-label="Experiencias y Servicios Interactivos de Siete Centros">
      <div className="hub-header-container">
        <div className="hub-eyebrow">
          <Sparkles size={13} className="gold-icon" />
          <span>{t.hub.badge}</span>
        </div>
        <h2 className="hub-main-title">{t.hub.title}</h2>
        <p className="hub-subtitle">
          {t.hub.desc}
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
                data-tab={tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="tab-icon-wrap">
                  <IconComponent size={18} />
                </div>
                <div className="tab-text-group">
                  <span className="tab-label">{tab.label[currentLang]}</span>
                  <span className="tab-sub">{tab.sub[currentLang]}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Botón Destacado para Entrar a la Página Separada Dedicada */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <a
          href={PAGE_URLS[activeTab].url}
          className="btn btn-secondary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontSize: '0.78rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '0.65rem 1.6rem',
            borderColor: 'var(--gold-border-highlight)',
            background: 'rgba(18, 12, 26, 0.85)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6), 0 0 15px rgba(223, 190, 144, 0.2)'
          }}
        >
          <span>{PAGE_URLS[activeTab].label[currentLang]}</span>
        </a>
      </div>

      {/* Dynamic Interactive Component Mount */}
      <div className="hub-content-stage">
        {activeTab === 'breathwork' && <BreathworkOrbe />}
        {activeTab === 'kriya' && <KriyaSpine />}
        {activeTab === 'tantra' && <TantraPolarity />}
        {activeTab === 'circulos' && <WordCircle />}
        {activeTab === 'retiros' && <RetreatsGrid />}
      </div>
    </section>
  );
};

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BoutiqueStore } from '../components/interactive/BoutiqueStore';
import { mountTantricBot } from '../interactive-mount';
import { initDomI18n } from '../scripts/i18n-dom';
import { initNavigation } from '../scripts/navigation';

// Inicializar internacionalización y navegación
initDomI18n();
initNavigation();

// Montar la Boutique en pantalla completa
const container = document.getElementById('boutique-app-root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <BoutiqueStore />
    </React.StrictMode>
  );
}

// Montar el Concierge Bot confidencial
mountTantricBot();


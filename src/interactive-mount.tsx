import React from 'react';
import { createRoot } from 'react-dom/client';
import { ServicesInteractiveHub } from './components/interactive/ServicesInteractiveHub';
import { TantricConciergeBot } from './components/interactive/TantricConciergeBot';
import { BoutiqueStore } from './components/interactive/BoutiqueStore';

export function mountInteractiveServices() {
  const container = document.getElementById('interactive-services-root');
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <ServicesInteractiveHub />
      </React.StrictMode>
    );
  }
}

export function mountBoutiqueStore() {
  const container = document.getElementById('mount-boutique-store');
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <BoutiqueStore />
      </React.StrictMode>
    );
  }
}

export function mountTantricBot() {
  let container = document.getElementById('siete-centros-bot-root');
  if (!container) {
    container = document.createElement('div');
    container.id = 'siete-centros-bot-root';
    document.body.appendChild(container);
  }
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <TantricConciergeBot />
    </React.StrictMode>
  );
}

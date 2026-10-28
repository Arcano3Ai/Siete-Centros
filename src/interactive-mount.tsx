import React from 'react';
import { createRoot } from 'react-dom/client';
import { ServicesInteractiveHub } from './components/interactive/ServicesInteractiveHub';

export function mountInteractiveServices() {
  const container = document.getElementById('interactive-services-root');
  if (!container) return;

  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ServicesInteractiveHub />
    </React.StrictMode>
  );
}

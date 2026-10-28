import React from 'react';
import { createRoot } from 'react-dom/client';
import { BreathworkOrbe } from '../components/interactive/BreathworkOrbe';

const container = document.getElementById('breathwork-app-root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <BreathworkOrbe />
    </React.StrictMode>
  );
}

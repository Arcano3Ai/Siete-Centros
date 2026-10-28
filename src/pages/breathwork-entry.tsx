import React from 'react';
import { createRoot } from 'react-dom/client';
import { BreathworkOrbe } from '../components/interactive/BreathworkOrbe';
import { mountTantricBot } from '../interactive-mount';
import { initDomI18n } from '../scripts/i18n-dom';

initDomI18n();

const container = document.getElementById('breathwork-app-root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <BreathworkOrbe />
    </React.StrictMode>
  );
}

mountTantricBot();

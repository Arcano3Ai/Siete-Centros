import React from 'react';
import { createRoot } from 'react-dom/client';
import { TantraPolarity } from '../components/interactive/TantraPolarity';
import { mountTantricBot } from '../interactive-mount';
import { initDomI18n } from '../scripts/i18n-dom';
import { initNavigation } from '../scripts/navigation';

initDomI18n();
initNavigation();

const container = document.getElementById('tantra-app-root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <TantraPolarity />
    </React.StrictMode>
  );
}

mountTantricBot();

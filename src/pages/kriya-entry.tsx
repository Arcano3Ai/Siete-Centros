import React from 'react';
import { createRoot } from 'react-dom/client';
import { KriyaSpine } from '../components/interactive/KriyaSpine';
import { mountTantricBot } from '../interactive-mount';
import { initDomI18n } from '../scripts/i18n-dom';

initDomI18n();

const container = document.getElementById('kriya-app-root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <KriyaSpine />
    </React.StrictMode>
  );
}

mountTantricBot();

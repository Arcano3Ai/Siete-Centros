import React from 'react';
import { createRoot } from 'react-dom/client';
import { RetreatsGrid } from '../components/interactive/RetreatsGrid';
import { mountTantricBot } from '../interactive-mount';
import { initDomI18n } from '../scripts/i18n-dom';

initDomI18n();

const container = document.getElementById('retiros-app-root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <RetreatsGrid />
    </React.StrictMode>
  );
}

mountTantricBot();

import React from 'react';
import { createRoot } from 'react-dom/client';
import { WordCircle } from '../components/interactive/WordCircle';
import { mountTantricBot } from '../interactive-mount';
import { initDomI18n } from '../scripts/i18n-dom';
import { initNavigation } from '../scripts/navigation';

initDomI18n();
initNavigation();

const container = document.getElementById('circulos-app-root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <WordCircle />
    </React.StrictMode>
  );
}

mountTantricBot();

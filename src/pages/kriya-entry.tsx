import React from 'react';
import { createRoot } from 'react-dom/client';
import { KriyaSpine } from '../components/interactive/KriyaSpine';

const container = document.getElementById('kriya-app-root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <KriyaSpine />
    </React.StrictMode>
  );
}

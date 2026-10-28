import React from 'react';
import { createRoot } from 'react-dom/client';
import { TantraPolarity } from '../components/interactive/TantraPolarity';

const container = document.getElementById('tantra-app-root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <TantraPolarity />
    </React.StrictMode>
  );
}

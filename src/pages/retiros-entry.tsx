import React from 'react';
import { createRoot } from 'react-dom/client';
import { RetreatsGrid } from '../components/interactive/RetreatsGrid';

const container = document.getElementById('retiros-app-root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <RetreatsGrid />
    </React.StrictMode>
  );
}

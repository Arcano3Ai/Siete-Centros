import React from 'react';
import { createRoot } from 'react-dom/client';
import { WordCircle } from '../components/interactive/WordCircle';

const container = document.getElementById('circulos-app-root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <WordCircle />
    </React.StrictMode>
  );
}

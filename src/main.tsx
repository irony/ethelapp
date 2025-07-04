// src/main.tsx
//
console.log("🐣 main.tsx is running");

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/app/App';
import '@/styles/index.css';

if (import.meta.env.DEV) {
  import('@/mocks/browser').then(({ worker }) => {
    worker.start();
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


// src/main.tsx
console.log("🐣 main.tsx is running");

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/app/App';
import '@/styles/index.css';

if (import.meta.env.DEV) {
  // stub out a few /api/... routes in dev
  const _fetch = window.fetch.bind(window);
  window.fetch = async (input, init?) => {
    const url = typeof input === 'string' ? input : input.url;

    if (url.endsWith('/api/profile') && (!init || init.method === 'GET')) {
      return new Response(JSON.stringify({ name: 'John Doe', role: 'student' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (url.endsWith('/api/chat/history') && (!init || init.method === 'GET')) {
      return new Response(
        JSON.stringify([{ from: 'system', message: 'Welcome!', timestamp: Date.now() }]),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    if (url.endsWith('/api/chat/send') && init?.method === 'POST') {
      const body = init.body ? JSON.parse(init.body.toString()) : {};
      return new Response(
        JSON.stringify({ ...body, id: Math.random().toString(36).slice(-8) }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // fallback to real fetch
    return _fetch(input, init);
  };
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


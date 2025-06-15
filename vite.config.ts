import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig(({ command }) => {
  const isServe = command === 'serve';
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 3000,
      https: isServe
        ? {
            key: fs.readFileSync('/run/certs/privkey.pem'),
            cert: fs.readFileSync('/run/certs/fullchain.pem'),
          }
        : false,
    },
  };
});


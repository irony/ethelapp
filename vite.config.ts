import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig(({ command }) => {
  const isServe = command === 'serve';

  return {
    plugins: [react()],
    resolve: {
      alias: [
        // Only alias "@/foo" → "src/foo"
        {
          find: /^@\/(.+)$/,
          replacement: path.resolve(__dirname, 'src/$1'),
        },
      ],
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      https: isServe
        ? {
            key: fs.readFileSync('/run/certs/privkey.pem'),
            cert: fs.readFileSync('/run/certs/fullchain.pem'),
          }
        : false,
      // hmr: { overlay: false }, // disable overlay if you like
    },
  };
});


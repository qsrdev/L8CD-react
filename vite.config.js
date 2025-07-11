import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0', // rende visibile il server su altri dispositivi
    port: 5173       // imposta una porta fissa se vuoi
  }
});


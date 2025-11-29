import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// PUNE DOMENIUL TAU EXACT AICI
const NGROK_HOST = "mindi-unfeignable-marvin.ngrok-free.dev";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // ADAUGAM SECTIUNEA DE SERVER
  server: {
    // Permite accesul de pe domeniul Ngrok
    host: '0.0.0.0', // Optional, dar util pentru retea locala
    allowedHosts: [
      NGROK_HOST
    ]
  },

  base: './',
})
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: './dist',
    rollupOptions: {
      input: {
        main: './index.html',
        about: "./about-me.html",
        contact: "./contact.html",
        proyects: "./proyects.html"
      },
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // <--- ត្រូវមានហ្នឹង

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <--- ដាក់បញ្ចូលទីនេះ
  ],
});
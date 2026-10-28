/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        civic: {
          darkest: '#001424',
          navy: '#00223d',
          blue: '#083763',
          border: '#d0d7de',
          gold: '#c27803',
          green: '#008037',
          paper: '#f8fafc',
        }
      }
    },
  },
  plugins: [],
}

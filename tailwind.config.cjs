/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0C10',
        panel: '#1A1D24',
        border: '#2A2D36',
        gold: '#34d399',
        ivory: '#F4F1EA'
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Jost"', 'sans-serif']
      },
      boxShadow: {
        luxury: '0 20px 80px rgba(0,0,0,0.45)',
        glow: '0 0 0 1px rgba(52,211,153,0.16), 0 20px 80px rgba(0,0,0,0.45)'
      }
    }
  },
  plugins: []
};
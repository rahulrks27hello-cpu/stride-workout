/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#090b10',
        surface: '#11151d',
        card: '#151a24',
        muted: '#1f2633',
        border: '#273142',
        success: '#22c55e',
        warning: '#facc15',
        danger: '#ef4444',
        accent: '#4ade80'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(74, 222, 128, 0.08), 0 12px 32px rgba(0, 0, 0, 0.28)'
      },
      animation: {
        pulseSoft: 'pulseSoft 2.2s ease-in-out infinite',
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.65' },
        },
      },
    },
  },
  plugins: [],
};

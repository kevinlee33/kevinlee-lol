
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
      colors: {
        navy: '#29446d',
        night: '#1b273d',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(2%, -3%, 0) scale(1.02)' },
          '100%': { transform: 'translate3d(0,0,0) scale(1)' },
        },
        'noise-shift': {
          '0%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(-2%,1%,0) scale(1.01)' },
          '100%': { transform: 'translate3d(0,0,0) scale(1)' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 14s ease-in-out infinite',
        noise: 'noise-shift 12s ease-in-out infinite',
      },
      boxShadow: {
        glow: '0 8px 30px rgba(255,255,255,0.08)'
      },
    },
  },
  plugins: [],
}

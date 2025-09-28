/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cibc: {
          red: '#E31837',
          'red-dark': '#C41E3A',
          'red-light': '#F8F0F0',
        }
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        slideIn: {
          'from': { transform: 'translateX(100%)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(239, 68, 68, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}
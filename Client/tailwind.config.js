// client/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',    // Blue-500
        accent: '#f59e0b',     // Amber-500
        secondary: '#10b981',  // Green-500
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'ping-delayed': 'ping-delayed 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'ping-delayed': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '70%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
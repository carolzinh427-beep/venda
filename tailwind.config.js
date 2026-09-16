/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agro: {
          dark: '#0B1E14',
          deep: '#133E27',
          green: '#1B4D3E',
          leaf: '#2D6A4F',
          light: '#40916C',
          accent: '#D97706',
          'accent-hover': '#B45309',
          cream: '#F8FAF6',
          surface: '#F3F5F2',
          border: '#E2E8F0',
          graphite: '#181E1B',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'agro-card': '0 4px 20px -2px rgba(19, 62, 39, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'agro-hover': '0 12px 30px -4px rgba(19, 62, 39, 0.16), 0 4px 10px -2px rgba(0, 0, 0, 0.06)',
        'agro-glow': '0 0 25px rgba(217, 119, 6, 0.25)'
      }
    },
  },
  plugins: [],
}

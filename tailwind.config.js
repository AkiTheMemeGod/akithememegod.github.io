/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#1c1c1e',
        primary: '#0a84ff',
        'glass-100': 'rgba(255, 255, 255, 0.1)',
        'glass-200': 'rgba(255, 255, 255, 0.2)',
        'glass-300': 'rgba(255, 255, 255, 0.3)',
      },
      fontFamily: {
        sans: [
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Open Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

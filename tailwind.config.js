/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD700',
        'primary-dark': '#E6C200',
        secondary: '#FFF0B3',
        background: '#FFFDF5',
      },
    },
  },
  plugins: [],
}
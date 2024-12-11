/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E6C200', // Darker version of #FFD700
        'primary-dark': '#C5A400', // Darker version of #E6C200
        secondary: '#E6D6A3', // Darker version of #FFF0B3
        background: '#E6E3D8', // Darker version of #FFFDF5        
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C89B00',      /* Darker and more solid */
        'primary-dark': '#9C7F00', /* Darker and more solid */
        secondary: '#D0B67A',      /* Darker and more solid */        
        background: '#C8C4A6',
   
      },
    },
  },
  plugins: [],
}
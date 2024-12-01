/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    contaner: {
      padding: '2rem',
      center: true
    },
    extend: {
      fontFamily:{
        roboto: ['Roboto', 'sans-serif']
        
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}


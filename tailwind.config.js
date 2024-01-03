/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['main', 'Quicksand'],
      },
      colors: {
        main: '#41c48b',
        mainHover: "#328a63",
        mainDark: "#131f17",
        darkText: "#fff",
      }
    },
  },
  plugins: [],
}
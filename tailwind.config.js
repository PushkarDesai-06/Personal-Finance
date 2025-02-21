/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    // "./js/**/*.js",
    "./node_modules/flyonui/dist/js/*.js",
    './node_modules/apexcharts/**/*.js', // Include all relevant JS files from ApexCharts
    './node_modules/flyonui/dist/js/helper-apexcharts.js',
    './node_modules/flatpickr/**/*.js', // Include helper JS file with tooltip functions and initialization code
  ],
  flyonui: {
    vendors: true // Enable vendor-specific CSS generation
  },
  theme: {
    extend: {
      colors: {
        accent: '#7F6EA0',
        mainText: '#B8B6C0',
        secondary: '#6842DE'
      }, fontFamily: {
        'curvy': ['Pacifico', 'sans-serif'],
        'playful': ['Sour Gummy', 'sans-serif'],
        'customThin': ["montserrat", "sans-serif"]

      },
    },
  },
  plugins: [
    require("flyonui"),
    require("flyonui/plugin"), // Require only if you want to use FlyonUI JS component
    require('tailwind-scrollbar')
  ],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '5vw',
        sm: '3vw',
        lg: '6vw',
        xl: '8vw',
        '2xl': '10vw',
      }
    },
    extend: {},
  },
  plugins: [],
}


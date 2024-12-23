/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'sm': '640px', // => @media (min-width: 640px) { ... }
      'md': '768px', // => @media (min-width: 768px) { ... }
      'lg': '1024px', // => @media (min-width: 1024px) { ... }
      'xl': '1280px', // => @media (min-width: 1280px) { ... }
      '2xl': '1536px', // => @media (min-width: 1536px) { ... }
      'smaller': { 'min': '0px', 'max': '319px' }, // => @media (min-width: 0px) { ... }
      'mobile': { 'min': '320px', 'max': '639px' }, // => @media (min-width: 320px) { ... }
      'tablet': { 'min': '640px', 'max': '1023px' }, // => @media (min-width: 640px) { ... }
      'laptop': { 'min': '1024px', 'max': '1279px' }, // => @media (min-width: 1024px) { ... }
      'desktop': '1280px', // => @media (min-width: 1280px) { ... }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '5vw',
        'sm': '3vw',
        'lg': '6vw',
        'xl': '8vw',
        '2xl': '10vw',
      }
    },
    extend: {},
  },
  plugins: [],
}


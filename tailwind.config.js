/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        headline: ['Cormorant Garamond', 'serif'],
        body: ['Manrope', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        brand: {
          900: '#124118',
          800: '#195124',
          700: '#2d5a27',
          100: '#e9efe3',
        },
      },
    },
  },
  plugins: [],
}


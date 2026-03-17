/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050d1a',
          900: '#0a1628',
          800: '#0e1e34',
          700: '#122040',
          600: '#1a3050',
        },
        brand: '#38bdf8',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

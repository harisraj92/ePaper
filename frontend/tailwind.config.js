module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // custom primary color (e.g., dark blue)
        secondary: '#F59E0B', // custom secondary color (e.g., amber)
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

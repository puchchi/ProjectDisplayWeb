module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors:{
      primary:{
        DEFAULT: '#2F9FD9',
        light: '#7CCBF3'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

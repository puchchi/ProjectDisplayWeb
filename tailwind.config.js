module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        primary:{
          DEFAULT: '#2F9FD9',
          light: '#7CCBF3'
        },
        background:{
          DEFAULT: '#fff',
          "light": "#f7f7f7"
        },
        transparentBackground:{
          light: 'rgba(0, 0, 0, 0.25)'
        },
        dark:{
          DEFAULT: '#333333'
        },
        border:{
          DEFAULT: '#dddddd'
        },
        textColor:{
          heavy:'#333333',
          light: '#717171'
        }
      },
      maxWidth:{
        custom: 1440
      },
      fontFamily:{
        sans: [
          'Roboto',
          '"Inter"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      boxShadow:{
        search: '0px 1px 2px rgb(0 0 0 / 8%), 0px 4px 12px rgb(0 0 0 / 5%)',
        location: '2px 8px 16px rgb(0 0 0 / 20%), 2px 16px 32px rgb(0 0 0 / 15%)',
        locationResult: '0px 6px 20px rgb(0 0 0 / 20%)'
      }
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

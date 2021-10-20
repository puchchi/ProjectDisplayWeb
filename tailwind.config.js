module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2F9FD9',
          light: '#7CCBF3'
        },
        background: {
          DEFAULT: '#fff',
          dark: '#b0b0b0',    //rgb(176, 176, 176)
          light: "#f7f7f7",
          errorLight: "#fff8f6"
        },
        transparentBackground: {
          light: 'rgba(0, 0, 0, 0.25)'
        },
        dark: {
          DEFAULT: '#333333'
        },
        border: {
          DEFAULT: '#dddddd',   // rgb(221, 221, 221)
          light: "#ebebeb",     //rgb(235, 235, 235)
          dark: '#B0B0B0'     //rgb(176, 176, 176)
        },
        textColor: {
          extraHeavy: '#222222',    //rgb(34,34,34)
          heavy: '#333333',
          mildHeavy: "#484848",  //rgb(72,72,72)
          light: '#717171',    //rgb(113,113,113),
          lightest: '#dddddd'
        },
        error: {
          type1: 'rgb(193, 53, 21)'
        }
      },
      maxWidth: {
        custom: 1600
      },
      fontFamily: {
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
      boxShadow: {
        search: '0px 1px 2px rgb(0 0 0 / 8%), 0px 4px 12px rgb(0 0 0 / 5%)',
        location: '2px 8px 16px rgb(0 0 0 / 20%), 2px 16px 32px rgb(0 0 0 / 15%)',
        locationResult: '0px 6px 20px rgb(0 0 0 / 20%)',
        userDetailDropDown: '0px 6px 10px rgb(0 0 0 / 20%)'
      },
      transitionProperty: {
        width: 'width'
      },
      padding: {
        customSm: '1.25rem',  // Used as padding of main container of each comp
        customMd: '2.5rem'
      },
      margin: {
        customSm: '1.25rem',  // Should be same as padding
        customMd: '2.5rem',
        miniHeader: '80px'    // Equals to height of unexpanded header
      },
      transformOrigin: {
        '0': '0% 0%'
      },

      letterSpacing: {
        
      }
    },

  },
  variants: {
    extend: {},
  },
  plugins: [],
}

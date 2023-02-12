module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      md: {'max': '1500px'},
      sm: {'max': '800px'},
      'hover-hover': {'raw': '(hover: hover)'}
    },
    fontSize: {
      lg: ['4rem', {
        letterSpacing: '0.02em',
        lineHeight: '4rem',
      }],
      md: ['2rem', {
        letterSpacing: '-0.015em',
        lineHeight: '1',
      }],
      sm: ['1.5rem', {
        letterSpacing: '0.01em',
        lineHeight: '1',
      }],
      xs: ['1rem', {
        letterSpacing: '0.01em',
        lineHeight: '1.1',
      }]
    },
    extend: {
      zIndex: {
       '-10': '-10',
      },
      width: {
        '100' : '25rem'
      },
      dropShadow: {
        'shape': '0rem .2rem .1rem rgba(0,0,0,.5)',
      },
     fontFamily: {
       'diatype' : 'Diatype',
      },
      colors: {
        'primary-color' : 'black',
        'secondary-color' : '#dac4f2'
      },
      borderRadius: {
        '100' : '100%'
      },
      transitionDuration: {
        'transform' : '5000ms'
      },
      animation: {
       'slide-right': 'slideRight 1200ms ease-in-out 1 forwards',
       'slide-left': 'slideLeft 1000ms ease-in-out 1 forwards',
       'slide-right-slow': 'slideRight 1400ms ease-in-out 1 forwards',
       'slide-left-slow': 'slideLeft 1500ms ease-in-out 1 forwards',
      },
      keyframes: {
        slideRight :{
          '0%': { marginLeft: '-20rem'},
          '100%': {  marginLeft: '0'},
        },
        slideLeft :{
          '0%': { marginRight: '-20rem'},
          '100%': {  marginRight: '0'},
        },
        slideDown :{
          '0%': { transform: 'translate3d(100%,0,0)'},
          '100%': { transform: 'translate3d(0,0,0)' },
        },
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

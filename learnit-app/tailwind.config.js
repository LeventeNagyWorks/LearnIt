/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {
    scrollbar: ['hover', 'focus'],
    scrollbarThumb: ['hover', 'focus'],
  },
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['poppins', 'sans-serif'],
        'poetsen': ['poetsen one', 'sans-serif']
      },
      colors: {
        'cstm_bg_dark': '#0f0f0f',
        'cstm_white': '#EEEEEE',
        'accent_green_dark': '#20CC00',

        'accent_purple_dark': '#9400FF',
        'accent_orange_dark': '#e58c23',
      },
      keyframes: {
        handRotation: {
          '0%': { 
            transform: 'rotate(0deg)'},
          '7%': { 
            transform: 'rotate(-17deg)'},
          '21%': { 
            transform: 'rotate(17deg)'},
          '35%': { 
            transform: 'rotate(-17deg)'},
          '49%': { 
            transform: 'rotate(17deg)'},
          '63%': { 
            transform: 'rotate(0deg)'},
          '100%': { 
            transform: 'rotate(0deg)'},
        },
        loading: {
          '0%': {
            transform: 'translate(-960px)',
          },
          '60%': {
            transform: 'translate(-420px)',
          },
          '70%': {
            transform: 'translate(-420px)',
          },
          '100%': {
            transform: 'translate(0px)',
          }
        },
        showFavPoppin: {
          '0%': {
            transform: 'translate(-1px)',
          },
          '30%': {
            transform: 'translate(200px)',
          },
          '45%': {
            transform: 'translate(140px)',
          },
          '60%': {
            transform: 'translate(200px)',
          },
          '80%': {
            transform: 'translate(180px)',
          },
          '100%': {
            transform: 'translate(200px)',
          }
        },
        showAllPoppin: {
          '0%': {
            transform: 'translate(200px)',
          },
          '30%': {
            transform: 'translate(-1px)',
          },
          '45%': {
            transform: 'translate(60px)',
          },
          '60%': {
            transform: 'translate(-1px)',
          },
          '80%': {
            transform: 'translate(20px)',
          },
          '100%': {
            transform: 'translate(-1px)',
          }
        },
        showFav: {
          '0%': {
            transform: 'translate(-1px)',
          },
          '100%': {
            transform: 'translate(200px)',
          }
        },
        showAll: {
          '0%': {
            transform: 'translate(200px)',
          },
          '100%': {
            transform: 'translate(-1px)',
          }
        }
      },
      animation: {
        handRotation: 'handRotation 3s ease-in-out infinite',
        loading: 'loading 2s ease-in-out infinite',
        showFavPoppin: 'showFavPoppin 1s ease-in-out forwards',
        showFav: 'showFav 0.5s ease-in-out forwards',
        showAllPoppin: 'showAllPoppin 1s ease-in-out forwards',
        showAll: 'showAll 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}


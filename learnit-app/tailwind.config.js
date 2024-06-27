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
      },
      animation: {
        handRotation: 'handRotation 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}


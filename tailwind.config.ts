import { transform } from "next/dist/build/swc";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: '#00000000',
      main: {
        0: '#ffffff',
        500: '#DD7373',
        1000: '#000000'
      },
      secondary: {
        0: '#ffffff',
        500: '#55b5ff',
        1000: '#000000'
      },
      light: {
        500: '#FFC875'
      },
      tertiary: {
        0: '#ffffff',
        50: '#fafafa',
        100: '#d1d1d1',
        150: '#b8b8b8',
        200: '#a3a3a3',
        250: '#8c8c8c',
        300: '#757575',
        400: '#484848',
        450: '#313131',
        480: '#232323',
        500: '#1a1a1a',
        550: '#171717',
        600: '#141414',
        650: '#121212',
        700: '#0f0f0f',
        800: '#0a0a0a',
        900: '#050505',
        1000: '#000000'
      },
      green: {
        500: '#51FF86'
      },
      red: {
        0: '#ffffff',
        100: '#fbd9da',
        200: '#f8b3b5',
        300: '#f48d90',
        400: '#f1686b',
        450: '#ef5558',
        480: '#ee4a4d',
        500: '#ed4245',
        600: '#be3537',
        700: '#8f2829',
        800: '#5f1b1b',
        900: '#300e0e',
        1000: '#000000'
      },
      orange: {
        0: '#ffffff',
        100: '#fae5d3',
        200: '#f5cba7',
        300: '#f0b17b',
        400: '#eb984f',
        450: '#e98b39',
        500: '#e67e22',
        600: '#b8651b',
        700: '#8a4c14',
        800: '#5c330d',
        900: '#2e1a07',
        1000: '#000000'
      },
      yellow: '#FFC561',
      white: '#fff',
      black: '#000',
      gray: {
        0: '#ffffff',
        100: '#d6d6d8',
        200: '#adadb0',
        300: '#848489',
        400: '#5b5b62',
        440: '#4b4b53',
        480: '#3a3a43',
        500: '#32323b',
        600: '#28282f',
        700: '#1e1e23',
        800: '#141417',
        900: '#0a0a0c',
        1000: '#000000'
      },
      blue: {
        500: '#2f81f7'
      },
      purple: {
        500: '#BC88FF'
      }
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      scale: {
        99: '.99',
        101: '1.01'
      },
      transitionProperty: {
        'height': 'height'
      },
      backgroundImage: {
        'grid-texture': 'url("assets/grid.png")'
      },
      animation: {
        blob: 'blob 7s infinite',
        slide: 'slide 2s linear infinite',
        spotlight: 'spotlight 2s ease .75s 1 forwards',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)'
          },
          '33%': {
            transform: 'translate(15px, -15px) scale(1.03)'
          },
          '66%': {
            transform: 'translate(-15px, 15px) scale(0.97)'
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)'
          }
        },
        slide: {
          '0%': { transform: 'skew(-12deg) translateX(-100%)' },
          '50%': { transform: 'skew(-12deg) translateX(0)' },
          '100%': { transform: 'skew(-12deg) translateX(100%)' },
        },
        spotlight: {
          '0%': { opacity: '0%', transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: '100%', transform: 'translate(-50%,-40%) scale(1)' }
        },
      }
    }
  },
  plugins: [require('tailwindcss-dotted-background')],
};
export default config;

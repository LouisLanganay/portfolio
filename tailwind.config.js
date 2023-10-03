/** @type {import('tailwindcss').Config} */
export const content = [
  './src/**/**/*.{js,jsx,ts,tsx}'
];
export const theme = {
  colors: {
    transparent: '#00000000',
    main: {
      0: '#ffffff',
      500: '#D81E5B',
      1000: '#000000'
    },
    secondary: {
      0: '#ffffff',
      500: '#7678ED',
      1000: '#000000'
    },
    tertiary: {
      0: '#ffffff',
      100: '#d0d0d0',
      200: '#a0a0a0',
      250: '#898989',
      300: '#717171',
      400: '#424242',
      450: '#2a2a2a',
      480: '#1c1c1c',
      500: '#121212',
      550: '#101010',
      600: '#0e0e0e',
      650: '#0c0c0c',
      1000: '#000000'
    },
    green: {
      0: '#ffffff',
      100: '#d3f3dd',
      200: '#a6e6bb',
      300: '#7ad999',
      400: '#4dcc77',
      450: '#37c666',
      480: '#29c25c',
      500: '#20BF55',
      600: '#1a9944',
      700: '#147333',
      800: '#0d4d22',
      900: '#072711',
      1000: '#000000'
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
      500: '#a371f7'
    }
  },
  fontFamily: {
    Iblack: ['Inconsolata-Black', 'sans-serif'],
    Ibold: ['Inconsolata-Bold', 'sans-serif'],
    Imedium: ['Inconsolata-Medium', 'sans-serif'],
    Iregular: ['Inconsolata-Regular', 'sans-serif'],
    Ilight: ['Inconsolata-Light', 'sans-serif'],
    Mblack: ['Montserrat-Black', 'sans-serif'],
    Mbold: ['Montserrat-Bold', 'sans-serif'],
    Mmedium: ['Montserrat-Medium', 'sans-serif'],
    Mregular: ['Montserrat-Regular', 'sans-serif'],
    Mlight: ['Montserrat-Light', 'sans-serif'],
    Mthin: ['Montserrat-Thin', 'sans-serif']
  },
  extend: {
    scale: {
      99: '.99',
      101: '1.01'
    },
    backgroundImage: {
      'noisy-texture': 'url("assets/background_noisy.png")'
    }
  }
};
export const plugins = [];

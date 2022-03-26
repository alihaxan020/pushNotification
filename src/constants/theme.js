import {DefaultTheme, DarkTheme} from '@react-navigation/native';
export const lightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FD6F93',
    secondary: '#121212',
    text: '#282828',
    border: '#bababa',
  },
};
export const darkTheme = {
  dark: true,
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#FD6F93',
    secondary: '#ccc',
    text: '#FEFEFE',
    card: '#282828',
    background: '#121212',
    border: '#353535',
  },
};

export const COLORS = {
  primary: '#FD6F93',
  secondary: '#121212',
  white: 'white',
  black: 'black',
  yellowLight: '#FED271',
  pinkLight: '#EF9FC2',
  blueLight: '#85BFFF',
  grayLight: '#64676D',
  linearColor: 'rgba(255,255,255,0.3)',
  textSecondaryBlack: '#333',
  lightStatusBg: '#FEFEFE',
  darkStatusBg: '#121212',
  red: 'red',
  green: 'green',
};

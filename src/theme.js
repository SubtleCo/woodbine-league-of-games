import { createTheme } from '@mui/material/styles';

/*
  Central Material UI theme.
  Use this file whenever you want to change typography, color, or component defaults.
*/
const theme = createTheme({
  palette: {
    background: {
      default: '#f4efe6',
      paper: '#fffaf0'
    },
    primary: {
      main: '#0d5f4f'
    },
    secondary: {
      main: '#d97b38'
    },
    text: {
      primary: '#1e2421',
      secondary: '#3f4a44'
    }
  },
  typography: {
    fontFamily: '"Libre Baskerville", Georgia, serif',
    h1: {
      fontFamily: '"Bungee", "Trebuchet MS", sans-serif',
      letterSpacing: '0.02em'
    },
    h2: {
      fontFamily: '"Bungee", "Trebuchet MS", sans-serif',
      letterSpacing: '0.02em'
    },
    h3: {
      fontFamily: '"Bungee", "Trebuchet MS", sans-serif'
    },
    button: {
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 14
  }
});

export default theme;

import { createTheme } from '@mui/material/styles';

/*
  Central Material UI theme.
  Use this file whenever you want to change typography, color, or component defaults.
*/
const theme = createTheme({
  palette: {
    background: {
      default: '#eee5d1',
      paper: '#f8f3e7'
    },
    primary: {
      main: '#4d6d43'
    },
    secondary: {
      main: '#e07fa5'
    },
    text: {
      primary: '#121620',
      secondary: '#3d4a3f'
    }
  },
  typography: {
    fontFamily: '"JetBrains Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
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
    body1: {
      fontFamily: '"JetBrains Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    },
    body2: {
      fontFamily: '"JetBrains Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    },
    button: {
      fontFamily: '"JetBrains Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 4
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 4
        }
      }
    }
  }
});

export default theme;

import { createTheme } from '@mui/material/styles';

/*
  Central Material UI theme.
  Use this file whenever you want to change typography, color, or component defaults.
*/
const theme = createTheme({
  palette: {
    background: {
      default: '#faf6ed',
      paper: '#faf6ed'
    },
    primary: {
      main: '#4d6d43'
    },
    secondary: {
      main: '#b35d3a'
    },
    text: {
      primary: '#121620',
      secondary: '#3d4a3f'
    }
  },
  typography: {
    fontFamily: '"Work Sans", "Avenir Next", Avenir, "Segoe UI", sans-serif',
    h1: {
      fontFamily: '"Fraunces", "Iowan Old Style", Georgia, serif',
      letterSpacing: '-0.01em'
    },
    h2: {
      fontFamily: '"Fraunces", "Iowan Old Style", Georgia, serif',
      letterSpacing: '-0.01em'
    },
    h3: {
      fontFamily: '"Fraunces", "Iowan Old Style", Georgia, serif',
      letterSpacing: '-0.005em'
    },
    body1: {
      fontFamily: '"Work Sans", "Avenir Next", Avenir, "Segoe UI", sans-serif'
    },
    body2: {
      fontFamily: '"Work Sans", "Avenir Next", Avenir, "Segoe UI", sans-serif'
    },
    button: {
      fontFamily: '"Work Sans", "Avenir Next", Avenir, "Segoe UI", sans-serif',
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 10
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

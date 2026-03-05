import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import theme from './theme';
import { AdminAuthProvider } from './auth/AdminAuthContext';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AdminAuthProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </AdminAuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

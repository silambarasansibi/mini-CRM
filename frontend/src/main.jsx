import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './index.css';

const theme = createTheme({
  palette: {
    primary: { main: '#4facfe' },
    secondary: { main: '#f093fb' },
    background: { default: 'transparent', paper: 'transparent' },
    text: { primary: '#2d3748', secondary: '#718096' }
  },
  typography: {
    fontFamily: '"Outfit", sans-serif',
    button: { textTransform: 'none', fontWeight: 600 },
    h4: { fontWeight: 700, letterSpacing: '-0.5px' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
          boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)'
          }
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '4px 0 24px rgba(0,0,0,0.03)'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(20px)',
          color: '#2d3748',
          borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255,255,255,0.6)',
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.9)',
            },
            '&.Mui-focused': {
              backgroundColor: '#fff',
            }
          }
        }
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

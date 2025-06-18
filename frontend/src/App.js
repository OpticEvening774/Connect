// App.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SubjectList from './SubjectList';
import SubfolderView from './SubfolderView';
import ResourceViewer from './ResourceViewer';
import AboutUs from './AboutUs';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D1EEB2', // Keep your top bar color
    },
    secondary: {
      main: '#ff9800',
    },
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#333',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h6: {
      fontWeight: 700,
      fontSize: '1.25rem',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#D1EEB2',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          margin: '0 8px',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/Logo.png" alt="ConnectED Logo" className="logo" />
            <Typography variant="h6" className="title" style={{ color: '#000' }}>
              ConnectED Knowledge Hub
            </Typography>
          </div>
          <div>
            <Button color="inherit" component={Link} to="/" style={{ color: '#000' }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/about" style={{ color: '#000' }}>
              About Us
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<SubjectList />} />
        <Route path="/folder/:folderId" element={<SubfolderView />} />
        <Route path="/view/:fileId" element={<ResourceViewer />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

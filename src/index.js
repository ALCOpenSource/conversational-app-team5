import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <SnackbarProvider
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
    <App />
  </SnackbarProvider>
  </BrowserRouter>
</React.StrictMode>
);

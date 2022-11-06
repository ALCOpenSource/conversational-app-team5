import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/ContextProvider';
import { Login, Register } from './pages';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <SnackbarProvider
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
    <AuthProvider>
    <Routes>
    <Route path="/*" element={<App />} /> 
    <Route path="/login" element={(<Login />)} />
    <Route path="/register" element={(<Register />)} />
    </Routes>
    </AuthProvider>
  </SnackbarProvider>
  </BrowserRouter>
</React.StrictMode>
);

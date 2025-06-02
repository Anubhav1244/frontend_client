import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 
import {AuthProvider} from './Context/AuthContext.jsx'; // Import AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* <-- Wrap App with AuthProvider */}
      <App />
      </AuthProvider>
      <Toaster position="top-center" reverseOrder={false} /> {/* <-- Add Toaster */}
    </BrowserRouter>
  </StrictMode>
);

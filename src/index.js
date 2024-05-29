import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SmokesContextProvider } from './context/SmokesContext';
import { AuthContextProvider } from './context/AuthContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SmokesContextProvider>
        <App />
      </SmokesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

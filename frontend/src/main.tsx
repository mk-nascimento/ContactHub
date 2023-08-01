import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import { AuthProvider } from './Providers/Auth.provider.tsx';
import { ContactsProvider } from './Providers/ContactProvider.tsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContactsProvider>
          <App />
        </ContactsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

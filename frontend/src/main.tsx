import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.tsx';
import { AuthProvider } from './providers/Auth.provider.tsx';
import { ContactsProvider } from './providers/ContactProvider.tsx';
import { UserProvider } from './providers/User.provider.tsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContactsProvider>
          <UserProvider>
            <App />
            <ToastContainer toastClassName={'bg-grey-100'} />
          </UserProvider>
        </ContactsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

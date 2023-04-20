import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// core styles
import "./scss/volt.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";
import { ApolloProvider } from '@apollo/client';
import apolloClient from './utils/apollo';
import { AuthProvider } from './hooks/useAuth';
import { ToastProvider } from './hooks/useToast';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ApolloProvider>
    </ToastProvider>
  </React.StrictMode>
);

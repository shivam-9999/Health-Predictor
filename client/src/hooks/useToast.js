import React from 'react';

import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { v4 as uuidv4 } from 'uuid';

const ToastContext = React.createContext((toast) => {});

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = React.useState([]);

  const pushToast = (toast) => {
    setToasts((prevToasts) => [...prevToasts, { id: uuidv4(), ...toast }]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={pushToast}>
      {children}
      <ToastContainer position='bottom-center' className="position-fixed mb-4">
        { toasts.map((toast) => (
          <Toast key={toast.id} onClose={() => removeToast(toast.id)} delay={5000} autohide>
            <Toast.Header>
              <strong className="me-auto">{toast.title}</strong>
            </Toast.Header>
            <Toast.Body>{toast.content}</Toast.Body>
          </Toast>
        )) }
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => React.useContext(ToastContext);

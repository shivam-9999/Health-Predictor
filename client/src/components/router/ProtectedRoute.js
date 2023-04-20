import { Navigate } from 'react-router-dom';
import React from 'react';

import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children }) => {

  const { isLoggedIn } = useAuth();

  if (isLoggedIn === null) {
    // still checking if user is authenticated
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (!isLoggedIn) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;

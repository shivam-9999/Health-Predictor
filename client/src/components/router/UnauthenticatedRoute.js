import { Navigate } from 'react-router-dom';
import React from 'react';

import { useAuth } from '../../hooks/useAuth';

const UnauthenticatedRoute = ({ children }) => {

  const { isLoggedIn } = useAuth();

  if (isLoggedIn === null) {
    // still checking if user is authenticated
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (isLoggedIn) {
    // user is authenticated
    return <Navigate to="/" />;
  }

  return (
    <>
      {children}
    </>
  );
};

export default UnauthenticatedRoute;

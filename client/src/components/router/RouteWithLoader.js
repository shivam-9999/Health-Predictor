import React from 'react';
import Preloader from '../Preloader';

import { useAuth } from '../../hooks/useAuth';

const RouteWithLoader = ({ children }) => {
  const { loading } = useAuth();

  return (
    <>
      <Preloader show={loading} />
      {children}
    </>
  );
};
//
export default RouteWithLoader;


import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Preloader = (props) => {

  const { show } = props;

  return (
    <div className={`preloader bg-soft flex-column justify-content-center align-items-center ${show ? "" : "show"}`}>
      <Spinner animation="grow" height={40} />
    </div>
  );
};

export default Preloader;
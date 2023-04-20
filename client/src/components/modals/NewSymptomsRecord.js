import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useNavigate } from 'react-router'

import SymptomsForm from '../forms/SymptomsForm';

const NewSymptomsRecord = () => {
  const [show, setShow] = React.useState(false);
  
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false)
    navigate(0);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="mb-4" variant="primary" type="button" onClick={handleShow}>
        Submit COVID-19 Symptoms Record
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Symptoms Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SymptomsForm onClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  )
};

export default NewSymptomsRecord;
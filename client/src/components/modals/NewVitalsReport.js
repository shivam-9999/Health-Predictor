import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useNavigate } from 'react-router'

import VitalsForm from '../forms/VitalsForm';

const NewVitalsReport = () => {
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
        Submit Vitals Record
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vitals Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VitalsForm onClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  )
};

export default NewVitalsReport;
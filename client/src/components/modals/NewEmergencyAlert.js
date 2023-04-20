import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useNavigate } from 'react-router'

import EmergencyForm from '../forms/EmergencyForm';

const NewEmergencyAlert = () => {
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
        Send Emergency Alert
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Emergency Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmergencyForm onClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  )
};

export default NewEmergencyAlert;
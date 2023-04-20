import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useNavigate } from 'react-router'

import TipsForm from '../forms/TipsForm';

const NewTips = () => {
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
        Add New Tips
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Tips</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TipsForm onClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  )
};

export default NewTips;
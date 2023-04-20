import React from 'react';

import Modal from 'react-bootstrap/Modal';

import { useNavigate } from 'react-router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';

import SymptomsForm from '../forms/SymptomsForm';

const EditSymptomsRecord = ({ data }) => {
  const [show, setShow] = React.useState(false);
  
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false)
    navigate(0);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Dropdown.Item onClick={handleShow}>
        <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Symptoms Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SymptomsForm data={data} onClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  )
};

export default EditSymptomsRecord;
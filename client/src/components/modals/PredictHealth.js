import React from 'react';

import Modal from 'react-bootstrap/Modal';

import { useNavigate } from 'react-router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';

import { PREDICT_HEALTH_CONDITION } from '../../graphql/vitals';
import apolloClient from '../../utils/apollo';

const PredictHealth = ({
  heart_rate,
  systolic_pressure,
  diastolic_pressure,
  body_temperature,
  respiratory_rate,
  weight,
}) => {
  const [show, setShow] = React.useState(false);
  
  const navigate = useNavigate();

  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!show) return;

    setLoading(true);
    
    apolloClient.query({
      query: PREDICT_HEALTH_CONDITION,
      variables: {
        heart_rate: heart_rate,
        systolic_pressure: systolic_pressure,
        diastolic_pressure: diastolic_pressure,
        body_temperature: body_temperature,
        respiratory_rate: respiratory_rate,
      }
    }).then((res) => {
      console.log(res.data);
      setData(res.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }, [
    heart_rate,
    systolic_pressure,
    diastolic_pressure,
    body_temperature,
    respiratory_rate,
    show
  ]);

  const handleClose = () => {
    setShow(false)
    navigate(0);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Dropdown.Item onClick={handleShow}>
        <FontAwesomeIcon icon={faEye} className="me-2" /> View Health Prediction
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Health Prediction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div>
              <p className="fw-bold">Heart Rate: {heart_rate}</p>
              <p className="fw-bold">Systolic Pressure: {systolic_pressure}</p>
              <p className="fw-bold">Diastolic Pressure: {diastolic_pressure}</p>
              <p className="fw-bold">Body Temperature: {body_temperature}</p>
              <p className="fw-bold">Respiratory Rate: {respiratory_rate}</p>
              <p className="fw-bold">Weight: {weight}</p>
              <p className="fw-bold">Health Condition: {data.predictHealthCondition?.status}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
};

export default PredictHealth;

import React from "react";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { ADD_VITALS } from '../../graphql/vitals';
import { UPDATE_VITALS } from "../../graphql/vitals";

import { useMutation } from '@apollo/client';

import { useParams } from "react-router-dom";

const VitalsForm = ({ onClose, data }) => {
  const [addVitals] = useMutation(ADD_VITALS);
  const [editVitals] = useMutation(UPDATE_VITALS);

  const { patientId } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);

    if (data._id) {
      await editVitals({
        variables: {
          id: data._id,
          heart_rate: parseFloat(data.heart_rate),
          systolic_pressure: parseFloat(data.systolic_pressure),
          diastolic_pressure: parseFloat(data.diastolic_pressure),
          body_temperature: parseFloat(data.body_temperature),
          respiratory_rate: parseFloat(data.respiratory_rate),
          weight: parseFloat(data.weight),
        }
      });
    } else {
      await addVitals({
        variables: {
          patient: patientId,
          heart_rate: parseFloat(data.heart_rate),
          systolic_pressure: parseFloat(data.systolic_pressure),
          diastolic_pressure: parseFloat(data.diastolic_pressure),
          body_temperature: parseFloat(data.body_temperature),
          respiratory_rate: parseFloat(data.respiratory_rate),
          weight: parseFloat(data.weight),
        }
      });
    }

    onClose();
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4 border-0">
      <Card.Body>
        <h5 className="mb-4">Vitals Form</h5>
        <Form onSubmit={handleSubmit}>
          { data?._id && <input type="hidden" name="_id" value={data?._id} /> }
          <Row>
            <Col sm={12} className="mb-3">
              <Form.Group id="heart_rate">
                <Form.Label>Heart Rate</Form.Label>
                <Form.Control required type="number" name="heart_rate" defaultValue={data?.heart_rate} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-3">
              <Form.Group id="systolic_pressure">
                <Form.Label>Systolic Pressure</Form.Label>
                <Form.Control required type="number" name="systolic_pressure" defaultValue={data?.systolic_pressure} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-3">
              <Form.Group id="diastolic_pressure">
                <Form.Label>Diastolic Pressure</Form.Label>
                <Form.Control required type="number" name="diastolic_pressure" defaultValue={data?.diastolic_pressure} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-3">
              <Form.Group id="body_temperature">
                <Form.Label>Body Temperature</Form.Label>
                <Form.Control required type="number" name="body_temperature" defaultValue={data?.body_temperature} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-3">
              <Form.Group id="respiratory_rate">
                <Form.Label>Respiratory Rate</Form.Label>
                <Form.Control required type="number" name="respiratory_rate" defaultValue={data?.respiratory_rate} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-3">
              <Form.Group id="weight">
                <Form.Label>Weight</Form.Label>
                <Form.Control required type="number" name="weight" defaultValue={data?.weight} />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit">Submit</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default VitalsForm;
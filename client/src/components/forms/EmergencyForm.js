
import React from "react";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { ADD_EMERGENCY } from '../../graphql/emergency';
import { UPDATE_EMERGENCY } from '../../graphql/emergency';
import { useMutation } from '@apollo/client';

import { useParams } from "react-router-dom";

const EmergencyForm = ({ onClose, data }) => {
  const [addEmergency] = useMutation(ADD_EMERGENCY);
  const [editEmergency] = useMutation(UPDATE_EMERGENCY);

  const { patientId } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);

    if (data._id) {
      await editEmergency({
        variables: {
          id: data._id,
          concern: data.concern,
        }
      });
    } else {
      await addEmergency({
        variables: {
          patient: patientId,
          concern: data.concern,
        }
      });
    }

    onClose();
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4 border-0">
      <Card.Body>
        <h5 className="mb-4">Emergency Form</h5>
        <Form onSubmit={handleSubmit}>
          { data?._id && <input type="hidden" name="_id" value={data?._id} /> }
          <Row>
            <Col sm={12} className="mb-3">
              <Form.Group id="concern">
                <Form.Label>Concern</Form.Label>
                <Form.Control as="textarea" name="concern" required placeholder="What is your emergency?" defaultValue={data?.concern} />
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

export default EmergencyForm;
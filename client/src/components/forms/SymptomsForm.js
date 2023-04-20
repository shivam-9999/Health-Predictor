
import React from "react";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { ADD_SYMPTOMS } from '../../graphql/symptoms';
import { UPDATE_SYMPTOMS } from '../../graphql/symptoms';
import { useMutation } from '@apollo/client';

import { useParams } from "react-router-dom";


const SymptomsForm = ({ onClose, data }) => {
  const [addSymptoms] = useMutation(ADD_SYMPTOMS);
  const [editSymptoms] = useMutation(UPDATE_SYMPTOMS);

  const { patientId } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);

    if (data._id) {
      await editSymptoms({
        variables: {
          id: data._id,
          fever: !!data.fever,
          cough: !!data.cough,
          breathing_difficulty: !!data.breathing_difficulty,
          headache: !!data.headache,
          sore_throat: !!data.sore_throat,
        }
      });
    } else {
      await addSymptoms({
        variables: {
          patient: patientId,
          fever: !!data.fever,
          cough: !!data.cough,
          breathing_difficulty: !!data.breathing_difficulty,
          headache: !!data.headache,
          sore_throat: !!data.sore_throat,
        }
      });
    }

    onClose();
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4 border-0">
      <Card.Body>
        <h5 className="mb-4">COVID-19 Symptoms Form</h5>
        <Form onSubmit={handleSubmit}>
          { data?._id && <input type="hidden" name="_id" value={data?._id} /> }
          <Row>
            <Col sm={6} className="mb-3">
              <Form.Check
                type="switch"
                id="fever"
                name="fever"
                label="Do you have fever?"
                defaultChecked={data?.fever}
              />
            </Col>
            <Col sm={6} className="mb-3">
              <Form.Check
                type="switch"
                id="cough"
                name="cough"
                label="Do you have cough?"
                defaultChecked={data?.cough}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6} className="mb-3">
              <Form.Check
                type="switch"
                id="breathing_difficulty"
                name="breathing_difficulty"
                label="Do you have difficulty breathing?"
                defaultChecked={data?.breathing_difficulty}
              />
            </Col>
            <Col sm={6} className="mb-3">
              <Form.Check
                type="switch"
                id="headache"
                name="headache"
                label="Do you have headache?"
                defaultChecked={data?.headache}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6} className="mb-3">
              <Form.Check
                type="switch"
                id="sore_throat"
                name="sore_throat"
                label="Do you have sore throat?"
                defaultChecked={data?.sore_throat}
              />
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

export default SymptomsForm;
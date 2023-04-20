
import React from "react";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { ADD_TIP, UPDATE_TIP } from '../../graphql/tips';
import { useMutation } from '@apollo/client';


const TipsForm = ({ data, onClose }) => {
  const [addTip] = useMutation(ADD_TIP);
  const [editTip] = useMutation(UPDATE_TIP);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);

    if (data._id) {
      editTip({
        variables: {
          id: data._id,
          title: data.title,
          content: data.content,
        }
      });
    }
    else {
      addTip({
        variables: {
          title: data.title,
          content: data.content,
        }
      });
    }

    onClose();
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4 border-0">
      <Card.Body>
        <h5 className="mb-4">Tips Form</h5>
        <Form onSubmit={handleSubmit}>
          { data?._id && <input type="hidden" name="_id" value={data?._id} /> }
          <Row>
            <Col sm={12} className="mb-3">
              <Form.Group id="title">
                <Form.Label>Title</Form.Label>
                <Form.Control required name="title" type="text" defaultValue={data?.title} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-3">
              <Form.Group id="content">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" required name="content" defaultValue={data?.content} />
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

export default TipsForm;
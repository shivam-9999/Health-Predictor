
import React from "react";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { ADD_MOTIVATIONAL_VIDEO, UPDATE_MOTIVATIONAL_VIDEO } from '../../graphql/motivationalVideos';
import { useMutation } from '@apollo/client';


const MotivationalVideoForm = ({ data, onClose }) => {
  const [addMotivationalVideo] = useMutation(ADD_MOTIVATIONAL_VIDEO);
  const [editMotivationalVideo] = useMutation(UPDATE_MOTIVATIONAL_VIDEO);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);

    if (data._id) {
      editMotivationalVideo({
        variables: {
          id: data._id,
          title: data.title,
          description: data.description,
          videoUrl: data.videoUrl,
        }
      });
    }
    else {
      addMotivationalVideo({
        variables: {
          title: data.title,
          description: data.description,
          videoUrl: data.videoUrl,
        }
      });
    }

    onClose();
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4 border-0">
      <Card.Body>
        <h5 className="mb-4">Motivational Video Form</h5>
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
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" required name="description" defaultValue={data?.description} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-3">
              <Form.Group id="content">
                <Form.Label>Video URL</Form.Label>
                <Form.Control type="text" required name="videoUrl" defaultValue={data?.videoUrl} />
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

export default MotivationalVideoForm;
import React from "react";

import Card from 'react-bootstrap/Card';
import EditMotivationalVideos from "./modals/EditMotivationalVideos";

import { useAuth } from "../hooks/useAuth";
import { Button, Stack } from "react-bootstrap";

const MotivationalVideoCard = ({ data }) => {
  const { role } = useAuth();

  return (
    <Card border="light" className="bg-white shadow-sm mb-4 border-0">
      <Card.Header>
        <h5>{data?.title}</h5>
      </Card.Header>
      <Card.Body>
        <p>{data?.description}</p>
      </Card.Body>
      <Card.Footer>
        <Stack direction="horizontal" gap={4}>
          <Button onClick={() => {
            window.open(data?.videoUrl, '_blank');
          }}>Watch Video</Button>
          { role === 'nurse' && <EditMotivationalVideos data={data} /> }
        </Stack>
      </Card.Footer>
    </Card>
  );
};

export default MotivationalVideoCard;
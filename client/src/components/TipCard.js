import React from "react";

import Card from 'react-bootstrap/Card';
import EditTips from "./modals/EditTips";

import { useAuth } from "../hooks/useAuth";

const TipCard = ({ data }) => {
  const { role } = useAuth();

  return (
    <Card border="light" className="bg-white shadow-sm mb-4 border-0">
      <Card.Header>
        <h5>{data?.title}</h5>
      </Card.Header>
      <Card.Body>
        <p>{data?.content}</p>
      </Card.Body>
      <Card.Footer>
        { role === 'nurse' && <EditTips data={data} /> }
      </Card.Footer>
    </Card>
  );
};

export default TipCard;
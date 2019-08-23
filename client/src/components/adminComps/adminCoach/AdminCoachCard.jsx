import React from "react";
import Card from "react-bootstrap/Card";

const AdminCoachCard = ({ coach }) => {
  const { _id, coach_code, coach_name, sport } = coach;
  return (
    <Card style={{ width: "100%" }} className="mt-4">
      <Card.Body>
        <Card.Title>{coach_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{coach_code}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {sport.sport_name}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default AdminCoachCard;

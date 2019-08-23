import React from "react";
import Card from "react-bootstrap/Card";

const AdminLocationCard = ({ allLoc }) => {
  const { location_area, location_name, location_code, rmanager } = allLoc;
  return (
    <Card style={{ width: "100%" }} className="mt-4">
      <Card.Body>
        <Card.Title>{location_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {location_area}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {location_code}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default AdminLocationCard;

import React from "react";
import Link from "react-router-dom/Link";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

const DashboardCard = ({ currentRM }) => {
  const { rmanager_email, rmanager_name } = currentRM.rmanager;
  const { rmanager_location } = currentRM;
  return (
    <div>
      {rmanager_location.map(loc => {
        return (
          <Card style={{ width: "100%" }} className="mt-4" key={loc._id}>
            <Card.Body>
              <Card.Title className="text-center" key={loc._id}>
                {loc.location_name.toUpperCase()}
              </Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              {loc.sport.map(sp => (
                <ListGroupItem
                  key={sp._id}
                  className="d-flex justify-content-between"
                >
                  {sp.sport_name.toUpperCase()}
                  <Link to={`/sport/${sp._id}&${loc._id}`}> > </Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardCard;

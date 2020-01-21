import React from "react";
import Card from "react-bootstrap/Card";

import Button from "react-bootstrap/Button";

import "./AdminLocation.scss";
import { Mutation } from "react-apollo";
import { DELETE_LOCATION_CARD } from "../../queries";
import { GET_ALL_LOCATIONS } from "./../../queries/index";

const AdminLocationCard = ({ allLoc }) => {
  const { location_area, location_name, location_code, _id } = allLoc;

  const cardDelete = (e, deleteLocation) => {
    console.log("Lets's delete");
    deleteLocation().then(({ data }) => {
      console.log(data);
    });
  };
  return (
    <Card style={{ width: "100%" }} className="mt-4">
      <Card.Body>
        <div className="card-location-title">
          <Card.Title>{location_name}</Card.Title>
          <div className="del-button">
            <Mutation
              mutation={DELETE_LOCATION_CARD}
              variables={{ lID: _id }}
              refetchQueries={[{ query: GET_ALL_LOCATIONS }]}
            >
              {(deleteLocation, { data, loading, error }) => {
                if (error) return console.log(error);
                return (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={e => cardDelete(e, deleteLocation)}
                  >
                    X
                  </Button>
                );
              }}
            </Mutation>
          </div>
        </div>
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

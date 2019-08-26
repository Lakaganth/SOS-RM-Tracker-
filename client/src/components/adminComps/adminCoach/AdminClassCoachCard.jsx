import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import { Mutation } from "react-apollo";
import {
  GET_ALL_CLASSES_FOR_COACH,
  DELETE_CLASS_CARD
} from "./../../../queries/index";

const AdminClassCoachCard = ({ classTime }) => {
  const {
    _id,
    coach_class,
    coach_class_end,
    day_pattern,
    location,
    sport,
    rmanager,
    coach
  } = classTime;

  const cardClassDelete = (e, deleteClassTime) => {
    console.log("Lets's delete");
    deleteClassTime().then(({ data }) => {
      console.log(data);
    });
  };
  return (
    <div>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <div className="card-class-title">
            <Card.Title>
              {location.location_name} - {day_pattern}
            </Card.Title>
            <div className="del-button">
              <Mutation
                mutation={DELETE_CLASS_CARD}
                variables={{ ctID: _id }}
                refetchQueries={[
                  {
                    query: GET_ALL_CLASSES_FOR_COACH,
                    variables: { id: coach._id }
                  }
                ]}
              >
                {(deleteClassTime, { data, loading, error }) => {
                  if (error) return console.log(error);
                  return (
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={e => cardClassDelete(e, deleteClassTime)}
                    >
                      X
                    </Button>
                  );
                }}
              </Mutation>
            </div>
          </div>

          <Card.Subtitle className="mb-2 text-muted">
            {coach_class} - {coach_class_end}
          </Card.Subtitle>

          <Link to={`/admin/coach/report/${coach._id}&${location._id}`}>
            <Button variant="info">Reports</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminClassCoachCard;

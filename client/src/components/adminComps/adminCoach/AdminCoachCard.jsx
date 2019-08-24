import React from "react";
import Card from "react-bootstrap/Card";
import { DELETE_COACH_CARD, GET_ALL_COACHES } from "../../../queries";
import Button from "react-bootstrap/Button";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";

import "./AdminCoach.scss";

const AdminCoachCard = ({ coach }) => {
  const { _id, coach_code, coach_name, sport } = coach;

  const cardCoachDelete = (e, deleteCoach) => {
    console.log("Lets's delete");
    deleteCoach().then(({ data }) => {
      console.log(data);
    });
  };

  const capitalizeString = str => {
    return str
      .toLowerCase()
      .split(" ")
      .map(function(word) {
        return word[0].toUpperCase() + word.substr(1);
      })
      .join(" ");
  };

  return (
    <Card style={{ width: "100%" }} className="mt-4">
      <Card.Body>
        <div className="card-coach-title">
          <Card.Title>{capitalizeString(coach_name)}</Card.Title>
          <div className="edit-button">
            <Link to={`/admin/coach/edit/${_id}`}>
              <Button variant="warning">edit</Button>
            </Link>
          </div>
          <div className="del-button">
            <Mutation
              mutation={DELETE_COACH_CARD}
              variables={{ cID: _id }}
              refetchQueries={[{ query: GET_ALL_COACHES }]}
            >
              {(deleteCoach, { data, loading, error }) => {
                if (error) return console.log(error);
                return (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={e => cardCoachDelete(e, deleteCoach)}
                  >
                    X
                  </Button>
                );
              }}
            </Mutation>
          </div>
        </div>

        <Card.Subtitle className="mb-2 text-muted">{coach_code}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {capitalizeString(sport.sport_name)}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default AdminCoachCard;

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
    deleteCoach().then(({ data }) => {});
  };

  return (
    <Card style={{ width: "100%" }} className="mt-4">
      <Card.Body>
        <div className="card-coach-title">
          <Card.Title>{coach_name}</Card.Title>

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

        <Card.Subtitle className="mb-2 text-muted">
          <span>Coach Code :</span> {coach_code}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Sport: {sport.sport_name}
        </Card.Subtitle>
        <div className="coach-class-btns">
          <Link to={`/admin/coach/edit/${_id}`}>
            <Button variant="warning">edit</Button>
          </Link>
          <Link to={`/admin/coach/class/${_id}`}>
            <Button variant="info">Classes</Button>
          </Link>
          <Link to={`/admin/coach/add-class/${_id}`}>
            <Button variant="info">+ Classes</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AdminCoachCard;

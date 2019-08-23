import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { Link } from "react-router-dom";

const ClassTimeCard = ({ classtime }) => {
  console.log(classtime);
  const { coach_name } = classtime.coach;
  const { day_pattern, coach_class } = classtime;
  const class_coach = moment(coach_class);
  console.log(class_coach.local());
  return (
    <Card
      style={{ width: "100%" }}
      className="mt-3
    m-2"
    >
      <Card.Body>
        <Card.Title>{coach_name.toUpperCase()}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {day_pattern} - {coach_class.toString()}
        </Card.Subtitle>
        <Card.Text />
        <Link to={`/add-report/${classtime._id}`}>
          {" "}
          <Button> Add Report </Button>
        </Link>
        {/* <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
    </Card>
  );
};

export default ClassTimeCard;

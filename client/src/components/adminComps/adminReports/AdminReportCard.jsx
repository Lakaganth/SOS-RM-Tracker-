import React from "react";
import Card from "react-bootstrap/Card";
import Moment from "react-moment";
import moment from "moment";

const AdminReportCard = ({ report }) => {
  const {
    _id,
    class_start_time,
    class_end_time,
    coach_arrival_time,
    class_duration,
    students_enrolled,
    students_present,
    feedback_severity,
    feedback
  } = report;

  const start_day_num = moment(class_start_time);
  const start_day = moment().isoWeekday(1);
  console.log(start_day_num);
  return (
    <Card style={{ width: "100%" }} className="mt-4">
      <Card.Body>
        <div className="card-location-title">
          <Card.Title>
            Class start:{" "}
            <Moment format="ddd DD-MMM-YY hh:mm a">{class_start_time}</Moment>
          </Card.Title>
        </div>
        <Card.Subtitle className="mb-2 text-muted">
          {class_duration} minutes
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {students_present}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default AdminReportCard;

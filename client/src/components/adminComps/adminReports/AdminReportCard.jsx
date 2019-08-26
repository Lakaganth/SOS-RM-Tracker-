import React from "react";
import Card from "react-bootstrap/Card";
import Moment from "react-moment";
import moment from "moment";
import classNames from "classnames";

import "./AdminReport.scss";

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
    feedback,
    students_unpaid,
    location
  } = report;

  const reportCardClasses = classNames({
    "mt-4": true,
    "green-border": feedback_severity === "Green",
    "yellow-border": feedback_severity === "Yellow",
    "red-border": feedback_severity === "Red"
  });

  const unpaidClasses = classNames({
    "mb-2": true,
    "highlight-text": students_unpaid > 0
  });

  return (
    <Card style={{ width: "100%" }} className={reportCardClasses}>
      <Card.Body>
        <div className="card-location-title">
          <Card.Title>
            <h6>Location : {location.location_name}</h6>
            <h6>
              Class start:{" "}
              <span>
                {" "}
                <Moment format=" DD-MMM-YY hh:mm a ddd">
                  {class_start_time}
                </Moment>
              </span>
            </h6>{" "}
            <h6>
              Class Finish:{" "}
              <span>
                {" "}
                <Moment format=" DD-MMM-YY hh:mm a ddd">
                  {class_end_time}
                </Moment>
              </span>
            </h6>{" "}
            <h6>
              Coach Arrival:{" "}
              <span>
                {" "}
                <Moment format=" DD-MMM-YY hh:mm a ddd">
                  {coach_arrival_time}
                </Moment>
              </span>
            </h6>
          </Card.Title>
        </div>
        <Card.Subtitle className="mb-2 text-muted">
          Class Duration: {class_duration} minutes
        </Card.Subtitle>
        <div className="Students-attendence">
          <Card.Subtitle className="mb-2 text-muted">
            <span>Present/ Enrolled :</span> {students_present} /{" "}
            {students_enrolled}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 ">
            <span>Unpaid</span> {students_unpaid} / {students_enrolled}
          </Card.Subtitle>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AdminReportCard;

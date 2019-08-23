import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { Mutation } from "react-apollo";
import { ADD_NEW_REPORT } from "./../../queries/index";

const ReportForm = ({ match }) => {
  const cID = match.params.cID;
  console.log(cID);

  const [newReport, setNewReport] = React.useState({
    start_time: "",
    end_time: "",
    arrival_time: "",
    feedback: "",
    classTimeID: ""
  });

  const {
    start_time,
    end_time,
    arrival_time,
    classTimeID,
    feedback
  } = newReport;
  const handleChange = e => {
    setNewReport({
      ...newReport,
      classTimeID: cID,
      [e.target.name]: e.target.value
    });
  };

  const b = moment.utc(start_time).utcOffset("+05:30");

  console.log(b.toISOString());
  console.log(b);

  console.log(end_time);

  const class_start_time = moment
    .utc(start_time)
    .utcOffset("+05:30")
    .toISOString();
  const class_end_time = moment
    .utc(end_time)
    .utcOffset("+05:30")
    .toISOString();
  const coach_arrival_time = moment
    .utc(arrival_time)
    .utcOffset("+05:30")
    .toISOString();
  console.log(class_start_time);
  console.log(class_end_time);
  console.log(coach_arrival_time);

  const handleSubmit = (e, addReport) => {
    e.preventDefault();
    console.log(newReport);
    addReport().then(({ data }) => {
      console.log(data);
    });
  };

  return (
    <Mutation
      mutation={ADD_NEW_REPORT}
      variables={{
        class_start_time,
        class_end_time,
        coach_arrival_time,
        feedback,
        classTimeID
      }}
    >
      {(addReport, { data, loading, error }) => {
        return (
          <Form onSubmit={e => handleSubmit(e, addReport)} className="mt-3">
            <Form.Group controlId="start_time">
              <Form.Label>Class Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={start_time}
                name="start_time"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="end_time">
              <Form.Label>Class End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={end_time}
                name="end_time"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="end_time">
              <Form.Label>Coach Arrival Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={arrival_time}
                name="arrival_time"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="feedback">
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={feedback}
                name="feedback"
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              className="mx-7"
              type="submit"
              disabled={loading}
            >
              Submit
            </Button>
          </Form>
        );
      }}
    </Mutation>
  );
};

export default ReportForm;

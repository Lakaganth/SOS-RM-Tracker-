import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import moment from "moment";
import { Mutation } from "react-apollo";
import { ADD_NEW_REPORT } from "./../../queries/index";

const ReportForm = ({ match, history }) => {
  const cID = match.params.cID;
  console.log(cID);

  const [newReport, setNewReport] = React.useState({
    start_time: "",
    end_time: "",
    arrival_time: "",
    feedback: "",
    classTimeID: "",
    students_enrolled: 0,
    students_present: 0,
    students_unpaid: 0,
    feedback_severity: "Green"
  });

  const {
    start_time,
    end_time,
    arrival_time,
    classTimeID,
    students_enrolled,
    students_present,
    students_unpaid,
    feedback_severity,
    feedback
  } = newReport;

  const getStudentsNumber = () => {
    let arr = [];
    for (let i = 1; i <= 30; i++) {
      arr = [...arr, i];
    }

    return arr.map(a => <option>{a}</option>);
  };
  const getStudentsEnrolled = enrolled => {
    let arr = [];
    for (let i = 1; i <= enrolled; i++) {
      arr = [...arr, i];
    }

    return arr.map(a => <option>{a}</option>);
  };

  const handleChange = e => {
    setNewReport({
      ...newReport,
      classTimeID: cID,
      [e.target.name]: e.target.value
    });
  };

  // const b = moment.utc(start_time).utcOffset("+05:30");

  // console.log(b.toISOString());
  // console.log(b);

  // console.log(end_time);

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

  const handleSubmit = (e, addReport) => {
    e.preventDefault();
    console.log(newReport);
    addReport().then(({ data }) => {
      console.log(data);
      history.push("/");
    });
  };
  console.log(newReport);
  return (
    <Mutation
      mutation={ADD_NEW_REPORT}
      variables={{
        class_start_time,
        class_end_time,
        coach_arrival_time,
        students_enrolled,
        students_present,
        students_unpaid,
        feedback_severity,
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
            <Form.Group controlId="students_enrolled">
              <Form.Label>Students Enrolled</Form.Label>
              <Form.Control
                as="select"
                name="students_enrolled"
                onChange={e => {
                  setNewReport({
                    ...newReport,
                    students_enrolled: parseInt(e.target.value)
                  });
                }}
              >
                <option>Choose...</option>
                {getStudentsNumber()}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="students_present">
              <Form.Label>Students Present</Form.Label>
              <Form.Control
                as="select"
                name="students_present"
                onChange={e => {
                  setNewReport({
                    ...newReport,
                    students_present: parseInt(e.target.value)
                  });
                }}
              >
                <option>Choose...</option>
                {getStudentsEnrolled(students_enrolled)}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="students_unpaid">
              <Form.Label>Students Unpaid</Form.Label>
              <Form.Control
                as="select"
                name="students_unpaid"
                onChange={e => {
                  setNewReport({
                    ...newReport,
                    students_unpaid: parseInt(e.target.value)
                  });
                }}
              >
                <option>Choose...</option>
                <option>{0}</option>
                {getStudentsEnrolled(students_enrolled)}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label as="legend" column sm={2}>
                Feedback Severity
              </Form.Label>
              <Row sm={10}>
                <Form.Check
                  type="radio"
                  label="Green"
                  name="feedback_severity"
                  id="feedback_severity"
                  className="mr-1"
                  onChange={e => {
                    setNewReport({
                      ...newReport,
                      feedback_severity: "Green"
                    });
                  }}
                />
                <Form.Check
                  type="radio"
                  label="Yellow"
                  name="feedback_severity"
                  id="feedback_severity"
                  className="mr-1"
                  onChange={e => {
                    setNewReport({
                      ...newReport,
                      feedback_severity: "Yellow"
                    });
                  }}
                />
                <Form.Check
                  type="radio"
                  label="Red"
                  name="feedback_severity"
                  id="feedback_severity"
                  onChange={e => {
                    setNewReport({
                      ...newReport,
                      feedback_severity: "Red"
                    });
                  }}
                />
              </Row>
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

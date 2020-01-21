import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import moment from "moment";
import { Mutation } from "react-apollo";
import { ADD_NEW_REPORT } from "./../../queries/index";

// import TimeKeeper from "react-timekeeper";
import "./ReportForm.scss";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import "react-datepicker/dist/react-datepicker-cssmodules.css";

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

  // class_end_time 2019-08-24T19:00:00.000Z

  const class_start_time = moment
    .utc(start_time)
    .utcOffset("+05:30")
    .toISOString();

  const st = moment(class_start_time)._d;
  console.log("start to string", st);

  console.log("start", start_time);
  console.log("class_start_time", class_start_time);
  const class_end_time = moment
    .utc(end_time)
    .utcOffset("+05:30")
    .toISOString();

  // console.log("class_end_time", class_end_time);
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
        classTimeID: cID
      }}
    >
      {(addReport, { data, loading, error }) => {
        return (
          <Form onSubmit={e => handleSubmit(e, addReport)} className="mt-3">
            <Form.Group controlId="start_time">
              <h4>Class Start Time</h4>

              <DatePicker
                selected={start_time}
                placeholderText="Click to select a date "
                value={start_time}
                onChange={e => {
                  setNewReport({
                    ...newReport,
                    start_time: e
                  });
                }}
                showTimeSelect
                timeFormat="hh:mm "
                timeIntervals={10}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="Start time"
              />
            </Form.Group>
            <Form.Group controlId="end_time">
              {/* <Form.Label>Class End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={end_time}
                name="end_time"
                onChange={handleChange}
                required
              /> */}
              <h4>Class End Time</h4>
              <DatePicker
                selected={end_time}
                placeholderText="Click to select a date"
                value={end_time}
                onChange={e => {
                  setNewReport({
                    ...newReport,
                    end_time: e
                  });
                }}
                showTimeSelect
                timeFormat="hh:mm "
                timeIntervals={10}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="End time"
              />
            </Form.Group>
            <Form.Group controlId="end_time">
              {/* <Form.Label>Coach Arrival Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={arrival_time}
                name="arrival_time"
                onChange={handleChange}
                required
              /> */}
              <h4>Coach Arrival Time</h4>
              <DatePicker
                selected={arrival_time}
                placeholderText="Click to select a date "
                value={arrival_time}
                onChange={e => {
                  setNewReport({
                    ...newReport,
                    arrival_time: e
                  });
                }}
                showTimeSelect
                timeFormat="hh:mm "
                timeIntervals={5}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="Arrival time"
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

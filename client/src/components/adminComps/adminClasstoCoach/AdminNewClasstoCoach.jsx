import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Mutation, Query } from "react-apollo";
import { withRouter } from "react-router-dom";

import {
  // GET_ALL_COACHES,
  // GET_ALL_LOCATIONS,
  ADD_NEW_CLASS_TO_COACH,
  GET_LOCATIONS_FOR_COACH,
  GET_CURRENT_COACH
} from "./../../../queries/index";
import { BackButton } from "../../backButton/BackButton";
import history from "./../../../history";

const AdminNewClasstoCoach = props => {
  const coachID = props.match.params.coachID;

  const [newClass, setNewClass] = React.useState({
    coach_name: "",
    coach_class: "",
    location_name: "",
    coach_class_end: "",
    day_pattern: ""
  });
  const {
    coach_name,
    coach_class,
    location_name,
    coach_class_end,
    day_pattern
  } = newClass;

  const displayAllCoachName = () => {
    return (
      <Query query={GET_CURRENT_COACH} variables={{ id: coachID }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <option>Loading..</option>;
          }
          if (error) console.log(error);
          console.log(data);
          return <option>{data.getCurrentCoach.coach_name}</option>;
        }}
      </Query>
    );
  };
  const displayLocationName = () => {
    return (
      <Query query={GET_LOCATIONS_FOR_COACH} variables={{ coachID }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <option>Loading..</option>;
          }
          if (error) console.log(error);

          return data.getAllLocationsForCoach.map(loc => (
            <option key={loc._id}>{loc.location_name}</option>
          ));
        }}
      </Query>
    );
  };

  const handleChange = e => {
    setNewClass({
      ...newClass,
      [e.target.name]: e.target.value
    });
  };
  const goBack = () => {
    history.push("/admin/all-coach");
  };

  const handleSubmit = (e, addClassToCoach) => {
    e.preventDefault();
    console.log(newClass);
    addClassToCoach().then(({ data }) => {
      console.log(data);
      history.push("/admin/all-coach");
    });
  };

  return (
    <Mutation
      mutation={ADD_NEW_CLASS_TO_COACH}
      variables={{
        coach_name,
        coach_class,
        location_name,
        coach_class_end,
        day_pattern
      }}
    >
      {(addClassToCoach, { data, loading, error }) => {
        if (error) return console.log(error);
        return (
          <div>
            <Form
              className="mt-3"
              onSubmit={e => handleSubmit(e, addClassToCoach)}
            >
              <div className="back-btn" onClick={goBack}>
                <BackButton></BackButton>
              </div>
              <Form.Group controlId="coach_name">
                <Form.Label>Coach Name</Form.Label>
                <Form.Control
                  as="select"
                  onChange={e => {
                    setNewClass({
                      ...newClass,
                      coach_name: e.target.value
                    });
                  }}
                >
                  <option>Choose Coach...</option>
                  {displayAllCoachName()}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="location_name">
                <Form.Label>Location Name</Form.Label>
                <Form.Control
                  as="select"
                  onChange={e => {
                    setNewClass({
                      ...newClass,
                      location_name: e.target.value
                    });
                  }}
                >
                  <option>Choose Location...</option>
                  {displayLocationName()}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="coach_class">
                <Form.Label>Class Start Time</Form.Label>
                <Form.Control
                  type="time"
                  name="coach_class"
                  value={coach_class}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="coach_class_end">
                <Form.Label>Class End Time</Form.Label>
                <Form.Control
                  type="time"
                  name="coach_class_end"
                  value={coach_class_end}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="day_pattern">
                <Form.Label>Class Days</Form.Label>
                <Form.Label className="ml-2 text-muted">
                  eg: MON TUE WED
                </Form.Label>
                <Form.Control
                  type="text"
                  name="day_pattern"
                  value={day_pattern}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                className="mx-7"
                type="submit"
                //   disabled={loading}
              >
                Submit
              </Button>
            </Form>
          </div>
        );
      }}
    </Mutation>
  );
};

export default withRouter(AdminNewClasstoCoach);

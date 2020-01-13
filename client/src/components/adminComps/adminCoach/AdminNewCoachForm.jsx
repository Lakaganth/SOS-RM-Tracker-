import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Mutation, Query } from "react-apollo";

import { GET_ALL_LOCATIONS, GET_ALL_COACHES } from "../../../queries";
import { ADD_NEW_COACH_TO_LOCATION } from "./../../../queries/index";
import { BackButton } from "../../backButton/BackButton";

const AdminNewCoachForm = props => {
  const [newCoach, setNewCoach] = React.useState({
    coach_code: "",
    coach_name: "",
    coach_email: "",
    backup_coach: "",
    coach_sport: "",

    location_name: "",
    sport_code: ""
  });

  const {
    coach_name,
    coach_email,
    backup_coach,
    coach_sport,
    sport_code,
    coach_code,
    location_name
  } = newCoach;

  const goBack = () => {
    props.history.push("/admin/page");
  };

  const displayLocationName = () => {
    return (
      <Query query={GET_ALL_LOCATIONS}>
        {({ data, loading, error }) => {
          if (loading) {
            return <option>Loading..</option>;
          }
          if (error) console.log(error);

          return data.getAllLocation.map(loc => (
            <option key={loc._id}>{loc.location_name}</option>
          ));
        }}
      </Query>
    );
  };

  const handleChange = e => {
    setNewCoach({
      ...newCoach,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e, addCoachToLocation) => {
    e.preventDefault();
    console.log(newCoach);
    addCoachToLocation().then(({ data }) => {
      console.log(data);
      props.history.push("/admin/all-coach");
    });
  };

  return (
    <Mutation
      mutation={ADD_NEW_COACH_TO_LOCATION}
      variables={{
        coach_name,
        coach_email,
        backup_coach,
        coach_sport,
        sport_code,
        coach_code,
        location_name
      }}
      refetchQueries={[{ query: GET_ALL_COACHES }]}
    >
      {(addCoachToLocation, { data, loading, error }) => {
        return (
          <Form
            className="mt-3"
            onSubmit={e => handleSubmit(e, addCoachToLocation)}
          >
            <div className="back-btn" onClick={goBack}>
              <BackButton></BackButton>
            </div>

            <Form.Group controlId="coach_name">
              <Form.Label>Coach Name</Form.Label>
              <Form.Control
                type="text"
                name="coach_name"
                value={coach_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="coach_email">
              <Form.Label>Coach Email</Form.Label>
              <Form.Control
                type="email"
                name="coach_email"
                value={coach_email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="coach_code">
              <Form.Label>Coach Code</Form.Label>
              <Form.Control
                type="text"
                name="coach_code"
                value={coach_code}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="coach_sport">
              <Form.Label>Sport Name</Form.Label>
              <Form.Control
                type="text"
                name="coach_sport"
                value={coach_sport}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="sport_code">
              <Form.Label>Sport Code</Form.Label>
              <Form.Control
                type="text"
                name="sport_code"
                value={sport_code}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="backup_coach">
              <Form.Label>Backup Coach (Optional)</Form.Label>
              <Form.Control
                type="text"
                name="backup_coach"
                value={backup_coach}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="location_name">
              <Form.Label>Location</Form.Label>
              <Form.Control
                as="select"
                onChange={e => {
                  setNewCoach({
                    ...newCoach,
                    location_name: e.target.value
                  });
                }}
              >
                <option>Choose...</option>
                {displayLocationName()}
              </Form.Control>
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

export default AdminNewCoachForm;

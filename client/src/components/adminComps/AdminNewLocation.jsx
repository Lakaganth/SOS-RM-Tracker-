import React from "react";

import { Mutation, Query } from "react-apollo";
import FirebaseContext from "./../../context/firebase/firebaseContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { GET_ALL_RM, GET_ALL_LOCATIONS } from "../../queries";
import { ADMIN_ADD_NEW_LOCATION } from "./../../queries/index";
import { BackButton } from "../backButton/BackButton";

const AdminNewLocation = props => {
  const { user } = React.useContext(FirebaseContext);
  console.log(user);
  const [newLocation, setNewLocation] = React.useState({
    location_name: "",
    location_code: "",
    location_area: "",
    location_rmanager_email: "",
    location_rmanager_name: ""
  });

  const {
    location_name,
    location_code,
    location_area,
    location_rmanager_email,
    location_rmanager_name
  } = newLocation;

  const goBack = () => {
    props.history.push("/admin/page");
  };

  const displayRMEmail = () => {
    return (
      <Query query={GET_ALL_RM}>
        {({ loading, data, error }) => {
          if (loading) {
            return <option>Loading..</option>;
          }
          if (error) console.log(error);

          return data.getAllRM.map(rm => {
            return <option key={rm._id}>{rm.rmanager_email}</option>;
          });
        }}
      </Query>
    );
  };
  const displayRMName = () => {
    return (
      <Query query={GET_ALL_RM}>
        {({ loading, data, error }) => {
          if (loading) {
            return <option>Loading..</option>;
          }
          if (error) console.log(error);

          return data.getAllRM.map(rm => {
            return <option key={rm._id}>{rm.rmanager_name}</option>;
          });
        }}
      </Query>
    );
  };

  const handleChange = e => {
    setNewLocation({
      ...newLocation,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e, createNewLocation) => {
    e.preventDefault();
    createNewLocation().then(({ data }) => {
      console.log(data);
      props.history.push("/admin/all-location");
    });
  };

  if (!user) {
    return <h1>Pease log in</h1>;
  } else {
    return (
      <div>
        <Mutation
          mutation={ADMIN_ADD_NEW_LOCATION}
          variables={{
            location_name,
            location_code,
            location_area,
            location_rmanager_email,
            location_rmanager_name
          }}
          refetchQueries={[{ query: GET_ALL_LOCATIONS }]}
          // update={(store, { data }) => {
          //   try {
          //     const locationData = store.readQuery({
          //       query: GET_ALL_LOCATIONS
          //     });
          //     store.writeQuery({
          //       query: GET_ALL_LOCATIONS,
          //       // data: {
          //       //   location: [...locationData, data.ADMIN_ADD_NEW_LOCATION]
          //       // }
          //       data: produce(locationData,)
          //     });
          //   } catch (err) {
          //     console.log(err);
          //   }
          // }}
        >
          {(createNewLocation, { data, loading, error }) => {
            return (
              <Form
                className="mt-3"
                onSubmit={e => handleSubmit(e, createNewLocation)}
              >
                <div className="back-btn" onClick={goBack}>
                  <BackButton></BackButton>
                </div>
                <Form.Group controlId="location_name">
                  <Form.Label>Location Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="location_name"
                    value={location_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="location_code">
                  <Form.Label>Location Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="location_code"
                    value={location_code}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="location_area">
                  <Form.Label>Location Area</Form.Label>
                  <Form.Control
                    type="text"
                    name="location_area"
                    value={location_area}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="location_rmanager_email">
                  <Form.Label>RM Email</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={e => {
                      setNewLocation({
                        ...newLocation,
                        location_rmanager_email: e.target.value
                      });
                    }}
                  >
                    <option>Choose...</option>
                    {displayRMEmail()}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="location_rmanager_name">
                  <Form.Label>RM Name</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={e => {
                      setNewLocation({
                        ...newLocation,
                        location_rmanager_name: e.target.value
                      });
                    }}
                  >
                    <option>Choose...</option>
                    {displayRMName()}
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
      </div>
    );
  }
};

export default AdminNewLocation;

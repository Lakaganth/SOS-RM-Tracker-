import React from "react";
import { Query, Mutation } from "react-apollo";
import { GET_CURRENT_COACH } from "../../../queries";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { UPDATE_COACH } from "./../../../queries/index";

const AdminCoachCardEdit = ({ match }) => {
  const cID = match.params.cID;
  //   console.log(cID);

  const [editCoach, setEditCoach] = React.useState({
    coach_code: "",
    coach_name: "",
    coach_email: "",
    backup_coach: ""
  });

  const { coach_name, coach_email, backup_coach, coach_code } = editCoach;

  const onCompletedHandler = data => {
    // if (error) console.log(error);
    // if (loading) return null;
    // if (data) {

    if (!data) return console.log("no luck");

    setEditCoach({
      coach_name: data.getCurrentCoach.coach_name,
      coach_code: data.getCurrentCoach.coach_code,
      coach_email: data.getCurrentCoach.coach_email,
      backup_coach: data.getCurrentCoach.backup_coach
    });
  };

  const getCurrentCoachToEdit = () => {
    return (
      <Query
        query={GET_CURRENT_COACH}
        variables={{ id: cID }}
        onCompleted={onCompletedHandler}
      >
        {({ data, loading, error }) => {
          //   console.log("worlds");
          if (error) console.log(error);
          if (loading) return <h4>Loading...</h4>;
          //   console.log("data", data);
          //   const currentCoach = data.getCurrentCoach;
          return (
            <div>
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
              <Form.Group controlId="backup_coach">
                <Form.Label>Backup Coach (Optional)</Form.Label>
                <Form.Control
                  type="text"
                  name="backup_coach"
                  value={backup_coach}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          );
        }}
      </Query>
    );
  };

  //   console.log(getCurrentCoachToEdit());
  const handleChange = e => {
    setEditCoach({
      ...editCoach,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e, updateCoach) => {
    e.preventDefault();
    console.log(editCoach);
    updateCoach().then(({ data }) => {
      console.log(data);
      //   props.history.push("/admin/all-coach");
    });
  };

  React.useEffect(() => {
    // console.log("effect");
    onCompletedHandler();
    // getCurrentCoachToEdit();
    // -disable-next-line
  }, [getCurrentCoachToEdit]);

  console.log(editCoach);

  return (
    <div>
      <h1>hello</h1>
      <Mutation
        mutation={UPDATE_COACH}
        variables={{
          id: cID,
          coach_name,
          coach_email,
          backup_coach,
          coach_code
        }}
      >
        {(updateCoach, { data, loading, error }) => {
          //   console.log("hello");

          //   console.log(world);
          return (
            <Form className="mt-3" onSubmit={e => handleSubmit(e, updateCoach)}>
              {getCurrentCoachToEdit()}
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
};

export default AdminCoachCardEdit;

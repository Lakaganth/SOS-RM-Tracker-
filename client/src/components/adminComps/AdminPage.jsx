import React from "react";
import FirebaseContext from "./../../context/firebase/firebaseContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

const AdminPage = () => {
  const { user } = React.useContext(FirebaseContext);
  console.log(user);

  if (!user) {
    return <h1>Pease log in</h1>;
  } else {
    return (
      <div className="mx-auto">
        <h1>hello</h1>
        <div className="mx-auto">
          <div className="m-3">
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Create new Location</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>

                <Link className="pr-2" to="/admin/new-location">
                  Add Location
                </Link>

                <Link to="/admin/all-location">All Location</Link>
              </Card.Body>
            </Card>
          </div>
          <div className="m-3">
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Add Coach to Location</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>

                <Link className="pr-2" to="/admin/new-coach">
                  Add Coach
                </Link>
                <Link to="/admin/all-coach">All Coaches</Link>
              </Card.Body>
            </Card>
          </div>
          <div className="m-3">
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Add Class to Coach</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>

                <Link className="pr-2" to="/admin/new-class">
                  Add Class to Coach
                </Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
};

export default AdminPage;

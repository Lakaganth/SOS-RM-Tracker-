import React from "react";
import FirebaseContext from "./../../context/firebase/firebaseContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./AdminLocation.scss";

const AdminPage = props => {
  const { user } = React.useContext(FirebaseContext);
  console.log(user);

  if (!user) {
    return <h1>Pease log in</h1>;
  } else {
    return (
      <div className="mx-auto">
        <h3 className="text-center  mt-3 mb-4">Admin Page</h3>

        <div className="mx-auto">
          <div className="m-3">
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title className="text-center">Location</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle> */}
                <div className="admin-page-btn">
                  <Link className="pr-2 " to="/admin/new-location">
                    <Button>Add Location</Button>
                  </Link>

                  <Link to="/admin/all-location">
                    {" "}
                    <Button variant="info">All Location</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="m-3">
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title className="text-center"> Coach </Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle> */}
                <div className="admin-page-btn">
                  <Link className="pr-2 " to="/admin/new-coach">
                    <Button> Add Coach</Button>
                  </Link>
                  <Link to="/admin/all-coach">
                    {" "}
                    <Button variant="info"> All Coach</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
};

export default AdminPage;

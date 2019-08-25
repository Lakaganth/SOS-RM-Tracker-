import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Firebase Admin Auth
import FirebaseContext from "./context/firebase/firebaseContext";
import firebase from "./context/firebase/FirebaseState";

import "./App.css";
import SignupRM from "./components/auth/SignupRM";
import SigninRM from "./components/auth/SigninRM";
import AuthPage from "./pages/AuthPage/AuthPage";

import Dashboard from "./components/dashboard/Dashboard";

import NavbarApp from "./components/nav/NavbarApp";
import DashboardClasstime from "./components/dashboard/DashboardClasstime";
import ReportForm from "./components/report/ReportForm";
import SigninAdmin from "./components/adminAuth/SigninAdmin";

import UseAuth from "./components/adminAuth/UseAuth";
import AdminPage from "./components/adminComps/AdminPage";
import AdminNewLocation from "./components/adminComps/AdminNewLocation";
import AdminAllLocations from "./components/adminComps/AdminAllLocations";
import AdminNewCoachForm from "./components/adminComps/adminCoach/AdminNewCoachForm";
import AdminAllCoach from "./components/adminComps/adminCoach/AdminAllCoach";
import AdminNewClasstoCoach from "./components/adminComps/adminClasstoCoach/AdminNewClasstoCoach";
import AdminCoachCardEdit from "./components/adminComps/adminCoach/AdminCoachCardEdit";
import AdminAllClass from "./components/adminComps/adminClasstoCoach/AdminAllClass";
import AdminCoachClass from "./components/adminComps/adminCoach/AdminCoachClass";

const App = ({ refetch, session }) => {
  const user = UseAuth();
  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      <Fragment>
        <Router>
          <Route
            path="/"
            render={() => <NavbarApp refetch={refetch} session={session} />}
          />
          <Switch>
            <Fragment>
              <div className="container">
                <Route path="/admin/sign-in" component={SigninAdmin} />
                <Route path="/admin/page" component={AdminPage} />
                <Route
                  path="/admin/new-location"
                  component={AdminNewLocation}
                />
                <Route
                  path="/admin/all-location"
                  component={AdminAllLocations}
                />
                <Route path="/admin/new-coach" component={AdminNewCoachForm} />
                <Route path="/admin/all-coach" component={AdminAllCoach} />
                <Route
                  path="/admin/coach/class/:id"
                  component={AdminCoachClass}
                />
                <Route
                  path="/admin/coach/edit/:cID"
                  component={AdminCoachCardEdit}
                />
                <Route
                  path="/admin/coach/add-class/:coachID"
                  component={AdminNewClasstoCoach}
                />
                <Route path="/admin/all-class" component={AdminAllClass} />
                <Route path="/auth" component={AuthPage} refetch={refetch} />
                <Route
                  path="/sign-up"
                  render={() => <SignupRM refetch={refetch} />}
                />
                <Route
                  path="/sign-in"
                  render={() => <SigninRM refetch={refetch} />}
                />
                {session ? (
                  <Route
                    path="/"
                    exact
                    render={() => <Dashboard session={session} />}
                  />
                ) : null}
                <Route path="/sport/:id" exact component={DashboardClasstime} />
                <Route path="/add-report/:cID" exact component={ReportForm} />
              </div>
            </Fragment>
          </Switch>
        </Router>
      </Fragment>
    </FirebaseContext.Provider>
  );
};

export default App;

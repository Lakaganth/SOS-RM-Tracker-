import React, { Fragment } from "react";

import { Query } from "react-apollo";
import Loader from "../../util/Loader";
import { GET_ALL_COACHES } from "../../../queries";
import AdminCoachCard from "./AdminCoachCard";
import { BackButton } from "../../backButton/BackButton";

const AdminAllCoach = props => {
  const goBack = () => {
    props.history.push("/admin/page");
  };
  return (
    <Fragment>
      <div className="back-btn" onClick={goBack}>
        <BackButton></BackButton>
      </div>
      <Query query={GET_ALL_COACHES}>
        {({ data, loading, error }) => {
          if (loading) return <Loader />;
          if (error) return console.log(error);
          console.log(data);
          return data.getAllCoaches.map(coach => (
            <React.Fragment key={coach._id}>
              <AdminCoachCard key={coach._id} coach={coach} />
            </React.Fragment>
          ));
        }}
      </Query>
    </Fragment>
  );
};

export default AdminAllCoach;

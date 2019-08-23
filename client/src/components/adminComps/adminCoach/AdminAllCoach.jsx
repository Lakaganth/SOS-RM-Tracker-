import React from "react";

import { Query } from "react-apollo";
import Loader from "../../util/Loader";
import { GET_ALL_COACHES } from "../../../queries";
import AdminCoachCard from "./AdminCoachCard";

const AdminAllCoach = () => {
  return (
    <Query query={GET_ALL_COACHES}>
      {({ data, loading, error }) => {
        if (loading) return <Loader />;
        if (error) return console.log(error);
        console.log(data);
        return data.getAllCoaches.map(coach => (
          <AdminCoachCard key={coach._id} coach={coach} />
        ));
      }}
    </Query>
  );
};

export default AdminAllCoach;

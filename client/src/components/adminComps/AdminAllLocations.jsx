import React from "react";
import { Query } from "react-apollo";
import { GET_ALL_LOCATIONS } from "../../queries";
import AdminLocationCard from "./AdminLocationCard";

const AdminAllLocations = () => {
  return (
    <Query query={GET_ALL_LOCATIONS}>
      {({ data, loading, error }) => {
        if (loading) return <h4>Loading..</h4>;
        if (error) return console.log(error);

        console.log(data);

        return data.getAllLocation.map(loc => (
          <AdminLocationCard key={loc._id} allLoc={loc} />
        ));
      }}
    </Query>
  );
};

export default AdminAllLocations;

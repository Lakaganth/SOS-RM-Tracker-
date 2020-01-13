import React from "react";
import { Query } from "react-apollo";
import { GET_ALL_LOCATIONS } from "../../queries";
import AdminLocationCard from "./AdminLocationCard";
import { BackButton } from "../backButton/BackButton";

const AdminAllLocations = props => {
  const goBack = () => {
    props.history.push("/admin/page");
  };
  return (
    <div>
      <div className="back-btn" onClick={goBack}>
        <BackButton></BackButton>
      </div>

      <Query query={GET_ALL_LOCATIONS}>
        {({ data, loading, error }) => {
          if (loading) return <h4>Loading..</h4>;
          if (error) return console.log(error);

          return data.getAllLocation.map(loc => (
            <React.Fragment>
              <AdminLocationCard key={loc._id} allLoc={loc} />
            </React.Fragment>
          ));
        }}
      </Query>
    </div>
  );
};

export default AdminAllLocations;

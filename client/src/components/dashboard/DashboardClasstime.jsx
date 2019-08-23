import React from "react";
import { Query } from "react-apollo";
import { GET_CLASS_FOR_LOCATION_SPORT } from "./../../queries/index";
import Loader from "./../util/Loader";
import ClassTimeCard from "../classTimes/ClassTimeCard";

const DashboardClasstime = props => {
  const urlID = props.match.params.id.split("&");

  const sportID = urlID[0];
  const locID = urlID[1];
  console.log(sportID);
  console.log(locID);
  return (
    <Query query={GET_CLASS_FOR_LOCATION_SPORT} variables={{ sportID, locID }}>
      {({ data, loading, error }) => {
        if (loading) return <Loader />;

        return data.getClasstimeforLocationSport.map(ct => (
          <ClassTimeCard key={ct._id} classtime={ct} />
        ));
      }}
    </Query>
  );
};

export default DashboardClasstime;

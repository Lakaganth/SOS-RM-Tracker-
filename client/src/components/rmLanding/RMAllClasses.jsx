import React from "react";
import { Query } from "react-apollo";
import { GET_ALL_CLASSES_FOR_CURRENT_RM } from "../../queries/index";
import RMClassCard from "./RMClassCard";

const RMAllClasses = ({ session }) => {
  console.log(session.getcurrentRM.rmanager_email);

  const RMemail = session.getcurrentRM.rmanager_email;
  return (
    <Query query={GET_ALL_CLASSES_FOR_CURRENT_RM} variables={{ RMemail }}>
      {({ data, loading, error }) => {
        if (loading) return <h4> loading...</h4>;

        return data.getAllClassesForCurrentRM.map(classTimes => (
          <RMClassCard key={classTimes._id} classTimes={classTimes} />
        ));
      }}
    </Query>
  );
};

export default RMAllClasses;

import React from "react";
import { Query } from "react-apollo";
import AdminClassCoachCard from "./AdminClassCoachCard";
import { GET_ALL_CLASSES_FOR_COACH } from "../../../queries";
import Loader from "../../util/Loader";

const AdminCoachClass = ({ match }) => {
  const id = match.params.id;
  console.log(id);
  return (
    <div className="my-3 mb-3">
      <Query query={GET_ALL_CLASSES_FOR_COACH} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return <Loader></Loader>;
          if (error) return console.log(error);
          console.log(data);
          return data.getAllClassesForCoach.map(cl => {
            return (
              <AdminClassCoachCard
                key={cl._id}
                classTime={cl}
              ></AdminClassCoachCard>
            );
          });
        }}
      </Query>
    </div>
  );
};

export default AdminCoachClass;

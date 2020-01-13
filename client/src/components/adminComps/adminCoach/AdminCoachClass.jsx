import React from "react";
import { Query } from "react-apollo";
import AdminClassCoachCard from "./AdminClassCoachCard";
import { GET_ALL_CLASSES_FOR_COACH } from "../../../queries";
import Loader from "../../util/Loader";
import { BackButton } from "../../backButton/BackButton";

const AdminCoachClass = props => {
  const id = props.match.params.id;
  const goBack = () => {
    props.history.push("/admin/page");
  };
  return (
    <div className="my-3 mb-3">
      <div className="back-btn" onClick={goBack}>
        <BackButton></BackButton>
      </div>
      <Query query={GET_ALL_CLASSES_FOR_COACH} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return <Loader></Loader>;
          if (error) return console.log(error);

          return data.getAllClassesForCoach.map(cl => {
            return (
              <React.Fragment key={cl._id}>
                <AdminClassCoachCard
                  key={cl._id}
                  classTime={cl}
                ></AdminClassCoachCard>
              </React.Fragment>
            );
          });
        }}
      </Query>
    </div>
  );
};

export default AdminCoachClass;

import React from "react";
import { Query } from "react-apollo";
import Loader from "../../util/Loader";
import AdminReportCard from "./AdminReportCard";
import { GET_ALL_REPORTS_COACH } from "./../../../queries/index";

const AdminAllReportCoach = ({ match }) => {
  const coachID = match.params.coachID;
  return (
    <div>
      <Query query={GET_ALL_REPORTS_COACH} variables={{ coachID }}>
        {({ data, loading, error }) => {
          if (loading) return <Loader></Loader>;
          if (error) return console.log(error);

          console.log(data);
          return data.getAllReportsForCoach.map(report => {
            return (
              <AdminReportCard
                key={report._id}
                report={report}
              ></AdminReportCard>
            );
          });
        }}
      </Query>
    </div>
  );
};

export default AdminAllReportCoach;

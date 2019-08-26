import React from "react";
import { Query } from "react-apollo";
import Loader from "../../util/Loader";
import AdminReportCard from "./AdminReportCard";
import { GET_ALL_REPORTS_COACH } from "./../../../queries/index";

const AdminAllReportCoach = ({ match }) => {
  // const coachID = match.params.coachID;
  const urlID = match.params.id.split("&");

  const coachID = urlID[0];
  const locID = urlID[1];
  return (
    <div>
      <Query query={GET_ALL_REPORTS_COACH} variables={{ coachID, locID }}>
        {({ data, loading, error }) => {
          if (loading) return <Loader></Loader>;
          if (error) return console.log(error);
          // console.log("filter", data.getAllReportsForCoachLocation);
          const filterLocationReport = data.getAllReportsForCoachLocation.filter(
            rp => {
              // console.log(rp.location._id);
              console.log(locID);
              return rp.location._id == locID;
              // return rp;
            }
          );
          // console.log("filter", filter);
          return filterLocationReport.map(report => {
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

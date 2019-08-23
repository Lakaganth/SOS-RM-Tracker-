import React from "react";
import { Query } from "react-apollo";
import { GET_CURRENTRM_DASHBOARD } from "../../queries";
import Loader from "../util/Loader";
import DashboardCard from "./DashboardCard";

const Dashboard = ({ session }) => {
  const RMemail = session.getcurrentRM.rmanager_email;
  return (
    <div>
      <h2 className="mt-3 text-center">
        Hi {session.getcurrentRM.rmanager_name}
      </h2>
      <Query query={GET_CURRENTRM_DASHBOARD} variables={{ RMemail }}>
        {({ data, loading, error }) => {
          if (loading) return <Loader />;
          console.log(data.getCurrentRMDashboard);
          return <DashboardCard currentRM={data.getCurrentRMDashboard} />;
        }}
      </Query>
    </div>
  );
};

export default Dashboard;

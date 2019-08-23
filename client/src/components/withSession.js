import React from "react";
import { Query } from "react-apollo";
import { GET_CURRENT_RM } from "../queries";

const withSession = Component => props => {
  return (
    <Query query={GET_CURRENT_RM}>
      {({ data, loading, refetch }) => {
        if (loading) return null;
        // console.log(data);
        return <Component {...props} refetch={refetch} session={data} />;
      }}
    </Query>
  );
};

export default withSession;

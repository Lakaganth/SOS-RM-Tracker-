import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <Spinner animation="border" role="status" className="mt-3 text-center">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;

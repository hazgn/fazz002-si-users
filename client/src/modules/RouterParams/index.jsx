import React from "react";
import { useParams } from "react-router-dom";

const RouterParams = (WrappedComponent) => (props) => {
  const params = useParams();

  return <WrappedComponent {...props} params={params} />;
};

export default RouterParams;

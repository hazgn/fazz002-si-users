import React from "react";
import { useMediaQuery } from "@mui/material";
import theme from "./theme";

const useMediaSM = (WrappedComponent) => (props) => {
  const mediaQuery = useMediaQuery(theme.breakpoints.up("sm"));

  return <WrappedComponent {...props} isSmUp={mediaQuery} />;
};

export default useMediaSM;

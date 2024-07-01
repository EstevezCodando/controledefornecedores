import React from "react";
import { Typography as MuiTypography } from "@mui/material";

const Typography = ({ variant, component, children, ...props }) => {
  return (
    <MuiTypography variant={variant} component={component} {...props}>
      {children}
    </MuiTypography>
  );
};

export default Typography;

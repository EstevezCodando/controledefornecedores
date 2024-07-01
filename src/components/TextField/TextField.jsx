import React from "react";
import { TextField as MuiTextField } from "@mui/material";

const TextField = ({ label, variant, ...props }) => {
  return <MuiTextField label={label} variant={variant} {...props} />;
};

export default TextField;

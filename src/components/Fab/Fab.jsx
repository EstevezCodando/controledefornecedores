import React from "react";
import { Fab as MuiFab } from "@mui/material";

const Fab = ({ color, children, ...props }) => {
  return (
    <MuiFab color={color} {...props}>
      {children}
    </MuiFab>
  );
};

export default Fab;

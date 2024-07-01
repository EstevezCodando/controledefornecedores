import React from "react";
import { Grid as MuiGrid } from "@mui/material";

const Grid = ({ container, item, spacing, children, ...props }) => {
  return (
    <MuiGrid container={container} item={item} spacing={spacing} {...props}>
      {children}
    </MuiGrid>
  );
};

export default Grid;

// No need for a separate styles file, apply styles directly in the component using sx

import React from "react";
import { Button } from "@mui/material";

const RequestForm = () => {
  return (
    <Button
      sx={{
        marginTop: 2,
        color: "primary.contrastText",
        backgroundColor: "primary.main",
      }}
    >
      Submit
    </Button>
  );
};

export default RequestForm;

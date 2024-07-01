import React from "react";
import { IconButton as MuiIconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const IconButton = ({ type, ...props }) => {
  const renderIcon = () => {
    switch (type) {
      case "edit":
        return <Edit />;
      case "delete":
        return <Delete />;
      default:
        return null;
    }
  };

  return <MuiIconButton {...props}>{renderIcon()}</MuiIconButton>;
};

export default IconButton;

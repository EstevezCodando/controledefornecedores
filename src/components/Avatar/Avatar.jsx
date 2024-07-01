import React from "react";
import { Avatar as MuiAvatar } from "@mui/material";

const Avatar = ({ src, alt, ...props }) => {
  return <MuiAvatar src={src} alt={alt} {...props} />;
};

export default Avatar;

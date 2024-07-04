import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

const AlertContainer = styled(Box)(({ theme, severity }) => {
  let backgroundColor;
  let color;

  switch (severity) {
    case "error":
      backgroundColor = theme.palette.error.main;
      color = theme.palette.error.contrastText;
      break;
    case "warning":
      backgroundColor = theme.palette.warning.main;
      color = theme.palette.warning.contrastText;
      break;
    case "info":
      backgroundColor = theme.palette.info.main;
      color = theme.palette.info.contrastText;
      break;
    case "success":
      backgroundColor = theme.palette.success.main;
      color = theme.palette.success.contrastText;
      break;
    default:
      backgroundColor = theme.palette.grey[700];
      color = theme.palette.common.white;
  }

  return {
    backgroundColor,
    color,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
  };
});

const Alert = ({ severity, message, onClose }) => {
  return (
    <AlertContainer severity={severity}>
      <Typography variant="body1">{message}</Typography>
      {onClose && (
        <IconButton size="small" onClick={onClose} style={{ color: "inherit" }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </AlertContainer>
  );
};

Alert.propTypes = {
  severity: PropTypes.oneOf(["error", "warning", "info", "success"]),
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

Alert.defaultProps = {
  severity: "info",
  onClose: null,
};

export default Alert;

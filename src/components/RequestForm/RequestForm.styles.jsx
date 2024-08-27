import { styled } from "@mui/material/styles";

const useStyles = styled((theme) => ({
  submitButton: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  resetButton: {
    marginTop: theme.spacing(2),
    color: theme.palette.secondary.contrastText,
    borderColor: theme.palette.secondary.main,
  },
}));

export default useStyles;

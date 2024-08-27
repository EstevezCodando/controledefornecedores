import { styled } from "@mui/material/styles";

const useStyles = styled((theme) => ({
  container: {
    padding: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  form: {
    marginBottom: theme.spacing(4),
  },
  table: {
    marginBottom: theme.spacing(4),
  },
  avatar: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
  },
  gridContainer: {
    marginBottom: theme.spacing(4),
  },
  fabButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default useStyles;

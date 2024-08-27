import { styled } from "@mui/material/styles";

const useStyles = styled({
  emailTypography: {
    fontSize: "1rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  expandableCard: {
    transition: "transform 0.3s ease-in-out",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  fixedCardContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default useStyles;

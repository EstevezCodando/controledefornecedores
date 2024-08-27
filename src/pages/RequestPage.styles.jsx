import { styled } from "@mui/material/styles";

const useStyles = styled({
  title: {
    marginBottom: "32px",
  },
  requestBox: {
    borderRadius: 8,
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
    padding: "16px", // Usando valores fixos
  },
  aberta: {
    backgroundColor: "#f5f5f5",
  },
  emCotacao: {
    backgroundColor: "#ffeb3b",
  },
  cotada: {
    backgroundColor: "#4caf50",
  },
});

export default useStyles;

import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h4" component="h1" align="center">
          Bem-vindo!
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;

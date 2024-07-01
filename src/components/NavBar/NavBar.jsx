import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import {
  NavBarContainer,
  NavToolbar,
  NavButton,
  LogoutButton,
} from "./NavBar.styles";

const NavBar = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(navigate);
  };

  return (
    <NavBarContainer>
      <NavToolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Meu App
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <NavButton
            component={Link}
            to="/suppliers"
            className={location.pathname === "/suppliers" ? "active" : ""}
          >
            Fornecedores
          </NavButton>
          <NavButton
            component={Link}
            to="/contacts"
            className={location.pathname === "/contacts" ? "active" : ""}
          >
            Contatos
          </NavButton>
          <NavButton
            component={Link}
            to="/products"
            className={location.pathname === "/products" ? "active" : ""}
          >
            Produtos
          </NavButton>
          <NavButton
            component={Link}
            to="/quotations"
            className={location.pathname === "/quotations" ? "active" : ""}
          >
            Cotações
          </NavButton>
          <NavButton
            component={Link}
            to="/view-quotations"
            className={location.pathname === "/view-quotations" ? "active" : ""}
          >
            Consultas
          </NavButton>
        </Box>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </NavToolbar>
    </NavBarContainer>
  );
};

export default NavBar;

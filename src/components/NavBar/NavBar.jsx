import React from "react";
import { useLocation, Link } from "react-router-dom";
import { NavBarContainer, NavToolbar, NavButton } from "./NavBar.styles";

const NavBar = () => {
  const location = useLocation();

  return (
    <NavBarContainer>
      <NavToolbar>
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
      </NavToolbar>
    </NavBarContainer>
  );
};

export default NavBar;

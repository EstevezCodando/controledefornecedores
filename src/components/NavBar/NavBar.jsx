import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  NavBarContainer,
  NavToolbar,
  NavButton,
  NavButtonContainer,
  LogoutButton,
  LogoutButtonContainer,
  HamburgerMenu,
} from "./NavBar.styles";

import { isAdminUser } from "../../utils/authHelpers";

const NavBar = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const adminStatus = await isAdminUser(user.uid);
        setIsAdmin(adminStatus);
      }
    };
    checkAdminStatus();
  }, [user]);

  const handleLogout = () => {
    onLogout(navigate);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <NavBarContainer>
      <NavToolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Controle de Cotações {user && `- ${user.name}`}
        </Typography>
        <HamburgerMenu>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </HamburgerMenu>
        <NavButtonContainer>
          <NavButton
            component={Link}
            to="/"
            className={location.pathname === "/" ? "active" : ""}
          >
            Home
          </NavButton>
          <NavButton
            component={Link}
            to="/requests"
            className={location.pathname === "/requests" ? "active" : ""}
          >
            Requisições
          </NavButton>
          <NavButton
            component={Link}
            to="/view-quotations"
            className={location.pathname === "/view-quotations" ? "active" : ""}
          >
            Consultas
          </NavButton>
          {isAdmin && (
            <>
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
                to="/admin/users"
                className={location.pathname === "/admin/users" ? "active" : ""}
              >
                Gerenciar Usuários
              </NavButton>
              <NavButton
                component={Link}
                to="/admin/create-user"
                className={
                  location.pathname === "/admin/create-user" ? "active" : ""
                }
              >
                Criar Usuário
              </NavButton>
            </>
          )}
        </NavButtonContainer>
        <LogoutButtonContainer>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </LogoutButtonContainer>
      </NavToolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/request"
            onClick={handleDrawerToggle}
          >
            <ListItemText primary="Requisições" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/view-quotations"
            onClick={handleDrawerToggle}
          >
            <ListItemText primary="Consultas" />
          </ListItem>
          {isAdmin && (
            <>
              <ListItem
                button
                component={Link}
                to="/suppliers"
                onClick={handleDrawerToggle}
              >
                <ListItemText primary="Fornecedores" />
              </ListItem>

              <ListItem
                button
                component={Link}
                to="/contacts"
                onClick={handleDrawerToggle}
              >
                <ListItemText primary="Contatos" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/products"
                onClick={handleDrawerToggle}
              >
                <ListItemText primary="Produtos" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/quotations"
                onClick={handleDrawerToggle}
              >
                <ListItemText primary="Cotações" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/requests" 
                onClick={handleDrawerToggle}
              >
                <ListItemText primary="Requisições" />
              </ListItem>

              <ListItem
                button
                component={Link}
                to="/admin/users"
                onClick={handleDrawerToggle}
              >
                <ListItemText primary="Gerenciar Usuários" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/admin/create-user"
                onClick={handleDrawerToggle}
              >
                <ListItemText primary="Criar Usuário" />
              </ListItem>
            </>
          )}
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </NavBarContainer>
  );
};

export default NavBar;

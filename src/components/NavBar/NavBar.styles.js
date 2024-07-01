import { AppBar, Button, Toolbar, Box } from "@mui/material";
import styled from "styled-components";

export const NavBarContainer = styled(AppBar)`
  top: 0;
  position: fixed;
  width: 100%;
  z-index: 1100;
  background-color: #1e88e5;
  box-shadow: none;
  font-family: "Roboto", sans-serif;
`;

export const NavToolbar = styled(Toolbar)`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap; /* Alterado para evitar quebra de linha */
  padding: 0 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 10px 0;
  }
`;

export const NavButton = styled(Button)`
  color: #ffffff !important;
  margin: 0 15px; /* Ajustado para espaçamento adequado */
  padding: 12px 25px;
  transition: background-color 0.3s, transform 0.3s;
  font-size: 1rem; /* Ajustado o tamanho da fonte */
  font-weight: 700;
  text-transform: uppercase;
  &:hover {
    background-color: #1976d2;
    transform: scale(1.05);
  }
  &.active {
    background-color: #1976d2;
  }
`;

export const LogoutButton = styled(Button)`
  color: #ffffff !important;
  padding: 12px 25px;
  transition: background-color 0.3s, transform 0.3s;
  font-size: 1rem;
  font-weight: 50;
  text-transform: uppercase;
  &:hover {
    background-color: #1976d2;
    transform: scale(1.05);
  }
  &.active {
    background-color: #1976d2;
  }
  margin-left: auto; /* Posiciona o botão de logout no canto direito */
`;

import { AppBar, Button, Toolbar } from "@mui/material";
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
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const NavButton = styled(Button)`
  color: #ffffff !important;
  margin: 0 10px;
  padding: 12px 25px;
  transition: background-color 0.3s, transform 0.3s;
  font-size: 1.1rem;
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

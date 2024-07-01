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
  justify-content: space-between;
  padding: 0 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 10px 0;
  }
`;

export const NavButtonContainer = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

export const NavButton = styled(Button)`
  color: #ffffff !important;
  margin: 0 10px;
  padding: 10px 20px;
  transition: background-color 0.3s, transform 0.3s;
  font-size: 1rem;
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

export const LogoutButtonContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin-left: auto;

  @media (max-width: 600px) {
    margin-left: 0;
    margin-top: 1rem;
  }
`;

export const LogoutButton = styled(Button)`
  color: #ffffff !important;
  padding: 5px 10px;
  transition: background-color 0.3s, transform 0.3s;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  &:hover {
    background-color: #1976d2;
    transform: scale(1.05);
  }
  &.active {
    background-color: #1976d2;
  }
  border: 1px solid #ffffff;
`;

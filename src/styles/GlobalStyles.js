import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 64px;
    color: #ffffff;
    background: linear-gradient(135deg, #72edf2 10%, #5151e5 100%);
  }
`;

export default GlobalStyle;

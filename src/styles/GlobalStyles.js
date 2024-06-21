import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(135deg, #72EDF2 10%, #5151E5 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 64px;
    color: #ffffff;
  }
`;

export default GlobalStyle;

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
    background:  #5150f3;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 64px;
    color: #ffffff;
  }

 .MuiIconButton-root {
    padding: 4px;
  }

  .MuiDataGrid-root {
    border-radius: 8px;
  }

  .MuiDataGrid-cell {
    border-bottom: 1px solid rgba(224, 224, 224, 1);
    padding: 10px;
  }


  .MuiDataGrid-columnSeparator {
    display: none;
  }

  .MuiDataGrid-columnHeaders {
    background-color: #f5f5f5;
  }

  .MuiDataGrid-footerContainer {
    background-color: #f5f5f5;
  }

  .MuiIconButton-root:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export default GlobalStyle;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Box } from "@mui/material";
import SupplierPage from "./pages/SupplierPage";
import ContactsPage from "./pages/ContactsPage";
import ProductsPage from "./pages/ProductsPage";
import QuotationsPage from "./pages/QuotationsPage";
import ViewQuotationsPage from "./pages/ViewQuotationsPage";
import GlobalStyle from "./styles/GlobalStyles";
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <NavBar />
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <Switch>
            <Route path="/suppliers" component={SupplierPage} />
            <Route path="/contacts" component={ContactsPage} />
            <Route path="/products" component={ProductsPage} />
            <Route path="/quotations" component={QuotationsPage} />
            <Route path="/view-quotations" component={ViewQuotationsPage} />
          </Switch>
        </Box>
      </Container>
    </Router>
  );
};

export default App;

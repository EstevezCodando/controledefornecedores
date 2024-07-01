import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { getUser, authLogout } from "./utils/auth";
import NavBar from "./components/NavBar/NavBar";
import SupplierPage from "./pages/SupplierPage";
import ContactsPage from "./pages/ContactsPage";
import ProductsPage from "./pages/ProductsPage";
import QuotationsPage from "./pages/QuotationsPage";
import ViewQuotationsPage from "./pages/ViewQuotationsPage";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import GlobalStyle from "./styles/GlobalStyles";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  const handleLogout = (navigate) => {
    authLogout(navigate);
    setUser(null);
  };

  return (
    <>
      <GlobalStyle />
      <Router>
        {user && <NavBar user={user} onLogout={handleLogout} />}
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/suppliers"
            element={
              <ProtectedRoute user={user}>
                <SupplierPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <ProtectedRoute user={user}>
                <ContactsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute user={user}>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quotations"
            element={
              <ProtectedRoute user={user}>
                <QuotationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-quotations"
            element={
              <ProtectedRoute user={user}>
                <ViewQuotationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<Navigate to={user ? "/suppliers" : "/login"} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getUser, authLogout } from "./utils/auth";
import createAdminUser from "./utils/adminDefault";
import NavBar from "./components/NavBar/NavBar";
import SupplierPage from "./pages/SupplierPage";
import ContactsPage from "./pages/ContactsPage";
import ProductsPage from "./pages/ProductsPage";
import RequestPage from "./pages/RequestPage";
import QuotationsPage from "./pages/QuotationsPage";
import ViewQuotationsPage from "./pages/ViewQuotationsPage";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import SignUpForm from "./components/Login/SignUpForm";
import AdminUsersPage from "./pages/AdminUsersPage";
import ProtectedRoute from "./components/ProtectedRoute";
import GlobalStyle from "./styles/GlobalStyles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});


const App = () => {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      await createAdminUser(); // Cria um administrador padrão se não existir
      const currentUser = getUser();
      setUser(currentUser);
    };

    initializeApp();
  }, []);

  const handleLogout = (navigate) => {
    authLogout(navigate); // Realiza o logout do usuário
    setUser(null);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          {user && <NavBar user={user} onLogout={handleLogout} />}
          <div style={{ paddingTop: "64px" }}> </div>
          <Routes>
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
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
              path="/requests"
              element={
                <ProtectedRoute user={user}>
                  <RequestPage user={user} />
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
              path="/admin/users"
              element={
                <ProtectedRoute user={user} isAdmin>
                  <AdminUsersPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;

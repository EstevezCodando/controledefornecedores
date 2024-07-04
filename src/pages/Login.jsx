import React, { useState } from "react";
import LoginForm from "../components/Login/LoginForm";
import SignUpForm from "../components/Login/SignUpForm";
import "../styles/Login.css";

const LoginPage = ({ setUser }) => {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="background">
      <div className="login-container">
        {showSignUp ? (
          <SignUpForm
            setUser={setUser}
            toggleLogin={() => setShowSignUp(false)}
          />
        ) : (
          <LoginForm
            setUser={setUser}
            toggleSignUp={() => setShowSignUp(true)}
          />
        )}
      </div>
    </div>
  );
};

export default LoginPage;

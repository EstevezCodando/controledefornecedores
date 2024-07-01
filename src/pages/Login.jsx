import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authLogin, authSignUp } from "../utils/auth";
import "../styles/Login.css";

const Login = ({ setUser }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { message, user } = await authLogin(email, password);
    if (user) {
      setUser(user);
      navigate("/");
    } else {
      setMessage(message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { message, user } = await authSignUp(email, password);
    if (user) {
      setUser(user);
      navigate("/");
    } else {
      setMessage(message);
    }
  };

  return (
    <div className="background">
      <div className="login-container">
        {!showSignUp ? (
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
            <button
              type="button"
              className="switch"
              onClick={() => setShowSignUp(true)}
            >
              Criar Conta
            </button>
            {message && <p className="error-message">{message}</p>}
          </form>
        ) : (
          <form onSubmit={handleSignUp}>
            <h1>Criar Conta</h1>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Criar Conta</button>
            <button
              type="button"
              className="switch"
              onClick={() => setShowSignUp(false)}
            >
              Voltar para Login
            </button>
            {message && <p className="error-message">{message}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;

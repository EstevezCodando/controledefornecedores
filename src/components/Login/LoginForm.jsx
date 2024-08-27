import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authLogin } from "../../utils/auth"; // authLogin deve ser ajustado para recuperar os dados do Realtime Database
import "../../styles/Login.css";

const LoginForm = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { message, user } = await authLogin(email, password); // AuthLogin recupera os dados do usuário
    if (user) {
      setUser(user);
      if (user.userType === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/collaborator-dashboard");
      }
    } else {
      setMessage(message);
    }
  };

  return (
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
        onClick={() => navigate("/signup")}
      >
        Criar Conta
      </button>
      {message && <p className="error-message">{message}</p>}
    </form>
  );
};

export default LoginForm;

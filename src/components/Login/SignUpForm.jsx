import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authSignUp } from "../../utils/auth";
import "../../styles/Login.css";

const SignUpForm = ({ setUser, toggleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
      <button type="button" className="switch" onClick={toggleLogin}>
        Voltar para Login
      </button>
      {message && <p className="error-message">{message}</p>}
    </form>
  );
};

export default SignUpForm;

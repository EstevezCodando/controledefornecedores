import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authSignUp } from "../../utils/auth"; // Updated import to use the new auth service

const SignUpForm = ({ setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const userType = "collaborator";
    const { message, user } = await authSignUp(email, password, name, userType);
    if (user) {
      setUser(user);
      navigate("/collaborator-dashboard");
    } else {
      setMessage(message);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <h1>Criar Conta</h1>
      <div className="input-group">
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
        onClick={() => navigate("/login")}
      >
        Voltar para Login
      </button>
      {message && <p className="error-message">{message}</p>}
    </form>
  );
};

export default SignUpForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authSignUp } from "../../utils/auth"; // authSignUp deve ser ajustado para criar usuários no Firebase Auth e Realtime Database
import "../../styles/Login.css";

const SignUpForm = ({ setUser }) => {
  const [name, setName] = useState(""); // Coleta do nome do usuário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("SignUpForm submitted with:", { name, email, password }); // Logando os dados do formulário

    const userType = "collaborator"; // Todos os usuários criados aqui são colaboradores
    const { message, user } = await authSignUp(email, password, name, userType); // Passando o nome para o authSignUp
    if (user) {
      console.log("User successfully created:", user); // Logando o sucesso na criação do usuário
      setUser(user);
      navigate("/collaborator-dashboard");
    } else {
      console.error("Failed to create user:", message); // Logando o erro
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

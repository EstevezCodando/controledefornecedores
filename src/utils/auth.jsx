import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";

const authLogin = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;
    if (user.emailVerified) {
      window.localStorage.setItem("user", JSON.stringify(user));
      return { message: "", user };
    } else {
      await sendEmailVerification(user);
      return {
        message: "Confirme seu e-mail antes de fazer login!",
        user: null,
      };
    }
  } catch (e) {
    return { message: handleFirebaseError(e), user: null };
  }
};

const authSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await sendEmailVerification(user);
    return {
      message: "Conta criada com sucesso! Por favor, verifique seu email.",
      user,
    };
  } catch (e) {
    return { message: handleFirebaseError(e), user: null };
  }
};

const authLogout = async (navigate) => {
  await signOut(auth);
  window.localStorage.removeItem("user");
  navigate("/login"); // Redirecionar para a tela de login
};

const getUser = () => {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (e) {
    return null;
  }
};

const isLoggedIn = (navigate) => {
  const user = window.localStorage.getItem("user");
  const route = window.location.pathname;

  if (user) {
    if (route === "/login") {
      navigate("/suppliers");
    } else {
      return;
    }
  } else {
    navigate("/login");
  }
};

const handleFirebaseError = (error) => {
  switch (error.code) {
    case "auth/invalid-email":
      return "E-mail inválido.";
    case "auth/user-disabled":
      return "Usuário desativado.";
    case "auth/user-not-found":
      return "Usuário não encontrado.";
    case "auth/wrong-password":
      return "Senha incorreta.";
    case "auth/email-already-in-use":
      return "E-mail já está em uso.";
    case "auth/weak-password":
      return "A senha é muito fraca.";
    case "auth/too-many-requests":
      return "Muitas tentativas. Tente novamente mais tarde.";
    default:
      return "Erro desconhecido. Tente novamente.";
  }
};

export { authLogin, authSignUp, authLogout, getUser, isLoggedIn };

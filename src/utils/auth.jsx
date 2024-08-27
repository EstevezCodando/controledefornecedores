import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { auth, db } from "../firebase/config";

const handleFirebaseError = (error) => {
  console.error("Firebase Error:", error); // Adicionado console.log para erros
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


// Função para verificar se o usuário está bloqueado
const isUserBlocked = async (userId) => {
  const userRef = ref(db, `users/${userId}/isBlocked`);
  const snapshot = await get(userRef);
  return snapshot.exists() && snapshot.val() === true;
};

// Função para login de usuário
export const authLogin = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;

    // Verificar se o usuário está bloqueado
    const blocked = await isUserBlocked(user.uid);
    if (blocked) {
      await signOut(auth);
      return {
        message: "Usuário bloqueado. Contate o administrador.",
        user: null,
      };
    }

    // Recuperar dados adicionais do usuário (incluindo o nome)
    const userSnapshot = await get(ref(db, `users/${user.uid}`));
    if (userSnapshot.exists()) {
      const userData = userSnapshot.val();
      const userWithDetails = {
        ...user,
        name: userData.name,
        userType: userData.userType,
      };
      window.localStorage.setItem("user", JSON.stringify(userWithDetails));
      return { message: "", user: userWithDetails };
    } else {
      return { message: "Dados do usuário não encontrados.", user: null };
    }
  } catch (e) {
    return { message: handleFirebaseError(e), user: null };
  }
};

export const authSignUp = async (
  email,
  password,
  name,
  userType = "collaborator"
) => {
  console.log("authSignUp called with:", { email, password, name, userType }); // Logando os parâmetros recebidos

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User created:", user); // Logando o usuário criado

    await sendEmailVerification(user);
    console.log("Verification email sent to:", user.email); // Logando o envio do email de verificação

    // Armazenar tipo de usuário no Realtime Database
    await set(ref(db, `users/${user.uid}`), {
      email: user.email,
      name: name,
      userType: userType,
      createdAt: new Date().toISOString(),
      status: "active",
    });
    console.log("User data stored in Realtime Database"); // Logando o armazenamento no Realtime Database

    return {
      message: "Conta criada com sucesso! Por favor, verifique seu email.",
      user,
    };
  } catch (e) {
    console.error("Error in authSignUp:", e); // Logando o erro
    return { message: handleFirebaseError(e), user: null };
  }
};

// Função para logout
export const authLogout = async (navigate) => {
  await signOut(auth);
  window.localStorage.removeItem("user");
  navigate("/login");
};

// Função para obter o usuário atual
export const getUser = () => {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (e) {
    return null;
  }
};

// Função para verificar se o usuário é administrador
export const isAdmin = async () => {
  const user = auth.currentUser;
  if (user) {
    const userSnapshot = await get(ref(db, `users/${user.uid}`));
    if (userSnapshot.exists()) {
      return userSnapshot.val().userType === "admin";
    }
  }
  return false;
};

// Função para verificar se o usuário está logado e redirecionar se necessário
export const isLoggedIn = (navigate) => {
  const user = window.localStorage.getItem("user");
  const route = window.location.pathname;

  if (user) {
    if (route === "/login") {
      navigate("/");
    }
  } else {
    navigate("/login");
  }
};

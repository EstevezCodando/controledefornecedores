import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, firestoreDb as firestore } from "../firebase/config";

// Centralized Firebase error handling
const handleFirebaseError = (error) => {
  console.error("Firebase Error:", error);
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

// Check if the user is blocked
const isUserBlocked = async (userId) => {
  try {
    const userDoc = await getDoc(doc(firestore, "users", userId));
    return userDoc.exists() && userDoc.data().isBlocked === true;
  } catch (error) {
    console.error("Error checking if user is blocked:", error);
    return false;
  }
};

// Login user
export const authLogin = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;

    // Check if the user is blocked
    if (await isUserBlocked(user.uid)) {
      await signOut(auth);
      return {
        message: "Usuário bloqueado. Contate o administrador.",
        user: null,
      };
    }

    // Retrieve additional user data from Firestore
    const userDoc = await getDoc(doc(firestore, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
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
  } catch (error) {
    return { message: handleFirebaseError(error), user: null };
  }
};

// Sign up new user
export const authSignUp = async (email, password, name, userType = "collaborator") => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await sendEmailVerification(user);

    // Store user data in Firestore
    await setDoc(doc(firestore, "users", user.uid), {
      email: user.email,
      name,
      userType,
      createdAt: new Date().toISOString(),
      status: "active",
    });

    return {
      message: "Conta criada com sucesso! Por favor, verifique seu email.",
      user,
    };
  } catch (error) {
    return { message: handleFirebaseError(error), user: null };
  }
};

// Logout user
export const authLogout = async (navigate) => {
  try {
    await signOut(auth);
    window.localStorage.removeItem("user");
    navigate("/login");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

// Get current user from localStorage
export const getUser = () => {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    console.error("Error getting user from localStorage:", error);
    return null;
  }
};

// Check if the current user is an admin
export const isAdmin = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      if (userDoc.exists()) {
        return userDoc.data().userType === "admin";
      }
    }
    return false;
  } catch (error) {
    console.error("Error checking if user is admin:", error);
    return false;
  }
};

// Check if the user is logged in and redirect if necessary
export const isLoggedIn = (navigate) => {
  try {
    const user = getUser();
    const route = window.location.pathname;

    if (user) {
      if (route === "/login") {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  } catch (error) {
    console.error("Error checking if user is logged in:", error);
    navigate("/login");
  }
};

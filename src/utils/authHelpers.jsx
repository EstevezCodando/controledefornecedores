import { doc, getDoc } from "firebase/firestore";
import { firestoreDb } from "../firebase/config"; // Firestore Database

// Função para obter o tipo de usuário a partir do Firestore
export const getUserTypeFromFirestore = async (userId) => {
  try {
    const userDoc = await getDoc(doc(firestoreDb, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data().userType;
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar tipo de usuário:", error);
    return null;
  }
};

// Função para verificar se o usuário é administrador
export const isAdminUser = async (userId) => {
  const userType = await getUserTypeFromFirestore(userId);
  return userType === "admin";
};

// Função para verificar se o usuário está bloqueado
export const checkIfUserIsBlocked = async (userId) => {
  try {
    const userDoc = await getDoc(doc(firestoreDb, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data().isBlocked || false;
    }
    return false;
  } catch (error) {
    console.error("Erro ao verificar status de bloqueio:", error);
    return false;
  }
};

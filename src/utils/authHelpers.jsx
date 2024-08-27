import { get, ref } from "firebase/database";
import { db as realtimeDb } from "../firebase/config"; // Realtime Database

export const getUserTypeFromRealtimeDB = async (userId) => {
  try {
    const userRef = ref(realtimeDb, `users/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val().userType;
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar tipo de usuário:", error);
    return null;
  }
};

export const isAdminUser = async (userId) => {
  const userType = await getUserTypeFromRealtimeDB(userId);
  return userType === "admin";
};

export const checkIfUserIsBlocked = async (userId) => {
  try {
    const userRef = ref(realtimeDb, `users/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val().isBlocked || false;
    }
    return false;
  } catch (error) {
    console.error("Erro ao verificar status de bloqueio:", error);
    return false;
  }
};
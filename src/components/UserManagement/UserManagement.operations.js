import { ref, get, update } from "firebase/database";
import { db } from "../../firebase/config";
import { authSignUp } from "../../utils/auth";

// Função para obter a lista de usuários do Realtime Database
export const getUsers = async () => {
  const usersRef = ref(db, "users");
  const snapshot = await get(usersRef);
  const users = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      users.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      });
    });
  }
  return users;
};

// Função para bloquear ou desbloquear um usuário no Realtime Database
export const toggleUserBlockStatus = async (userId, isBlocked) => {
  const userRef = ref(db, `users/${userId}`);
  await update(userRef, { isBlocked });
};

// Função para criar um novo usuário administrador
export const createUserAdministrator = async (email, password, userType) => {
  try {
    const { message, user } = await authSignUp(email, password, userType);
    if (user) {
      return { success: true, message: "Usuário criado com sucesso!" };
    } else {
      return { success: false, message };
    }
  } catch (error) {
    return {
      success: false,
      message: "Erro ao criar usuário. Tente novamente.",
    };
  }
};

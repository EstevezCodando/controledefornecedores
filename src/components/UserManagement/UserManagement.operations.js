import {
  doc,
  collection,
  getDocs,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { firestoreDb } from "../../firebase/config";
import { authSignUp } from "../../utils/auth";

// Função para obter a lista de usuários do Firestore
export const getUsers = async () => {
  const usersCollection = collection(firestoreDb, "users");
  const usersSnapshot = await getDocs(usersCollection);
  const users = [];

  usersSnapshot.forEach((doc) => {
    users.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return users;
};

// Função para bloquear ou desbloquear um usuário no Firestore
export const toggleUserBlockStatus = async (userId, isBlocked) => {
  const userRef = doc(firestoreDb, "users", userId);
  await updateDoc(userRef, { isBlocked });
};

// Função para criar um novo usuário administrador
export const createUserAdministrator = async (
  email,
  password,
  userType = "admin"
) => {
  try {
    const { message, user } = await authSignUp(email, password, userType);
    if (user) {
      // Criando/atualizando o documento do usuário no Firestore
      const userRef = doc(firestoreDb, "users", user.uid);
      await setDoc(userRef, {
        email: user.email,
        userType: userType,
        createdAt: new Date().toISOString(),
        isBlocked: false,
      });

      return { success: true, message: "Usuário criado com sucesso!" };
    } else {
      return { success: false, message };
    }
  } catch (error) {
    console.error("Erro ao criar usuário administrador:", error);
    return {
      success: false,
      message: "Erro ao criar usuário. Tente novamente.",
    };
  }
};

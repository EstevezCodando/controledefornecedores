import { authSignUp } from "./auth";
import { query, where, getDocs, collection } from "firebase/firestore";
import { firestoreDb } from "../firebase/config"; // Importando o Firestore

// Função para verificar se o administrador já existe no Firestore
const adminExistsInFirestore = async () => {
  const adminQuery = query(
    collection(firestoreDb, "users"),
    where("userType", "==", "admin")
  );

  const adminSnapshot = await getDocs(adminQuery);
  return !adminSnapshot.empty; // Retorna true se o administrador existir
};

// Função para criar o primeiro administrador
export const createAdminUser = async () => {
  const adminName = "Administrador";
  const adminEmail = "jeanalvarez@id.uff.br";
  const adminPassword = "admin123@";

  // Verifica se o admin já existe no Firestore
  if (await adminExistsInFirestore()) {
    console.log(
      "Administrador já existe no Firestore. Nenhuma ação necessária."
    );
    return;
  }

  try {
    const { message, user } = await authSignUp(
      adminEmail,
      adminPassword,
      adminName
    );
    if (user) {
      console.log("Administrador criado com sucesso:", user);
    } else if (message.includes("E-mail já está em uso.")) {
      console.log(
        "Administrador já existe na autenticação. Nenhuma ação necessária."
      );
    } else {
      console.error("Erro ao criar administrador:", message);
    }
  } catch (error) {
    console.error("Erro ao criar administrador:", error);
  }
};

export default createAdminUser;

import { authSignUp } from "./auth";
import { get, ref, query, orderByChild, equalTo } from "firebase/database";
import { db as realtimeDb } from "../firebase/config"; // Importando o Realtime Database

// Função para verificar se o administrador já existe no Realtime Database
const adminExistsInRealtimeDB = async () => {
  const adminQuery = query(
    ref(realtimeDb, "users"),
    orderByChild("userType"),
    equalTo("admin")
  );

  const snapshot = await get(adminQuery);
  return snapshot.exists(); // Retorna true se o administrador existir
};

// Função para criar o primeiro administrador
export const createAdminUser = async () => {
  const adminEmail = "jeanalvarez@id.uff.br";
  const adminPassword = "admin123@";

  // Verifica se o admin já existe no Realtime Database
  if (await adminExistsInRealtimeDB()) {
    console.log(
      "Administrador já existe no Realtime Database. Nenhuma ação necessária."
    );
    return;
  }

  try {
    const { message, user } = await authSignUp(
      adminEmail,
      adminPassword,
      "admin"
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

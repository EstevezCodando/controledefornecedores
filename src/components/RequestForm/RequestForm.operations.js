import { firestoreDb } from "../../firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  where,
  query
} from "firebase/firestore";
import { getQuotationsByRequestId } from "../QuotationForm/QuotationForm.operations";

// Função para criar uma nova requisição
export const createRequest = async (requestData) => {
  try {
    const requestRef = collection(firestoreDb, "requests");
    await addDoc(requestRef, {
      ...requestData,
      status: "Aberta", // A requisição começa com o status "Aberta"
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Erro ao criar requisição: ", error);
    throw new Error("Erro ao criar requisição");
  }
};

// Função para obter produtos
export const getProducts = async () => {
  try {
    const productsRef = collection(firestoreDb, "products");
    const snapshot = await getDocs(productsRef);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error("Erro ao obter produtos: ", error);
    throw new Error("Erro ao obter produtos");
  }
};

// Função para atualizar o status de uma requisição
export const updateRequestStatus = async (requestId) => {
  try {
    // Obter todas as cotações associadas a essa requisição
    const quotationsRef = collection(firestoreDb, "quotations");
    const q = query(quotationsRef, where("requestId", "==", requestId));
    const snapshot = await getDocs(q);

    // Verificar o número de cotações
    const numberOfQuotations = snapshot.size;

    let newStatus = "Aberta";
    if (numberOfQuotations > 0) {
      newStatus = "Em Cotação";
    }
    if (numberOfQuotations >= 3) {
      newStatus = "Cotada";
    }

    // Atualizar o status da requisição no Firestore
    const requestRef = doc(firestoreDb, "requests", requestId);
    await updateDoc(requestRef, {
      status: newStatus,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Erro ao atualizar o status da requisição:", error);
    throw new Error("Erro ao atualizar o status da requisição");
  }
};

// Função para obter todas as requisições do usuário
export const getRequests = async (userEmail = null, userType = null) => {
  try {
    const requestsRef = collection(firestoreDb, "requests");

    let q;

    // Verificar se userType está definido
    if (userType === "collaborator") {
      if (!userEmail) {
        throw new Error("O e-mail do colaborador não foi fornecido.");
      }

      // Filtrar requisições para colaboradores pelo email do usuário
      q = query(requestsRef, where("userEmail", "==", userEmail));
    } else {
      // Para administradores, buscar todas as requisições
      q = query(requestsRef);
    }

    const querySnapshot = await getDocs(q);
    const requests = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return requests;
  } catch (error) {
    console.error("Erro ao obter requisições:", error);
    throw new Error("Erro ao obter requisições");
  }
};

// Função para verificar e atualizar o status da requisição baseado nas cotações
export const checkAndUpdateRequestStatus = async (requestId) => {
  try {
    const quotations = await getQuotationsByRequestId(requestId);
    let status = "Aberta";
    if (quotations.length >= 3) {
      status = "Cotada";
    } else if (quotations.length > 0) {
      status = "Em Cotação";
    }
    await updateRequestStatus(requestId, status);
  } catch (error) {
    console.error("Erro ao verificar e atualizar status da requisição:", error);
    throw new Error("Erro ao verificar e atualizar status da requisição");
  }
};

// Função para excluir uma requisição
export const deleteRequest = async (requestId) => {
  try {
    const requestRef = doc(firestoreDb, "requests", requestId);
    await deleteDoc(requestRef);
  } catch (error) {
    console.error("Erro ao excluir requisição:", error);
    throw new Error("Erro ao excluir requisição");
  }
};

// Função para atualizar uma requisição existente
export const updateRequest = async (requestId, updatedData) => {
  try {
    const requestRef = doc(firestoreDb, "requests", requestId);
    await updateDoc(requestRef, updatedData);
  } catch (error) {
    console.error("Erro ao atualizar requisição:", error);
    throw new Error("Erro ao atualizar requisição");
  }
};

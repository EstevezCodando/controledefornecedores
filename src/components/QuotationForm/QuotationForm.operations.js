import { firestoreDb } from "../../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { updateRequestStatus } from "../RequestForm/RequestForm.operations";

// Função para obter cotações de uma requisição específica
export const getQuotationsByRequestId = async (requestId) => {
  try {
    const quotationsRef = collection(firestoreDb, "quotations");
    const q = query(quotationsRef, where("requestId", "==", requestId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Erro ao obter cotações:", error);
    throw new Error("Erro ao obter cotações");
  }
};

// Função para adicionar uma nova cotação
export const addQuotation = async (requestId, quotationData, user) => {
  try {
    const quotationsRef = collection(firestoreDb, "quotations");

    // Formatação correta da data da cotação para armazenamento
    const formattedDate = new Date(quotationData.quotationDate).toISOString(); // ISO format

    await addDoc(quotationsRef, {
      ...quotationData,
      requestId,
      supplierId: quotationData.supplierId, // Armazenar o ID do fornecedor
      supplierName: quotationData.supplierName, // Armazenar o nome do fornecedor
      quotationDate: formattedDate, // Armazenar a data corretamente formatada
      userId: user.uid, // Armazenar o ID do usuário que fez a cotação
      userName: user.name, // Armazenar o nome do usuário
      createdAt: new Date(),
    });

    // Atualiza o status da requisição
    await updateRequestStatus(requestId);
  } catch (error) {
    console.error("Erro ao adicionar cotação:", error);
    throw new Error("Erro ao adicionar cotação");
  }
};

// Função para editar uma cotação existente
export const editQuotation = async (quotationId, updatedData, requestId) => {
  try {
    const quotationRef = doc(firestoreDb, "quotations", quotationId);
    await updateDoc(quotationRef, updatedData);

    // Atualiza o status da requisição, caso tenha impacto
    await updateRequestStatus(requestId);
  } catch (error) {
    console.error("Erro ao editar cotação:", error);
    throw new Error("Erro ao editar cotação");
  }
};

// Função para deletar uma cotação
export const deleteQuotation = async (quotationId, requestId) => {
  try {
    const quotationRef = doc(firestoreDb, "quotations", quotationId);
    await deleteDoc(quotationRef);

    // Atualiza o status da requisição
    await updateRequestStatus(requestId);
  } catch (error) {
    console.error("Erro ao deletar cotação:", error);
    throw new Error("Erro ao deletar cotação");
  }
};


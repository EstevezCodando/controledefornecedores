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


export const addQuotation = async (requestId, quotationData, user) => {
  try {
    const quotationsRef = collection(firestoreDb, "quotations");

   
    const formattedDate = new Date(quotationData.quotationDate).toISOString(); 

    await addDoc(quotationsRef, {
      ...quotationData,
      requestId,
      supplierId: quotationData.supplierId, 
      supplierName: quotationData.supplierName, 
      quotationDate: formattedDate, 
      userId: user.uid, 
      userName: user.name, 
      createdAt: new Date(),
    });

   
    await updateRequestStatus(requestId);
  } catch (error) {
    console.error("Erro ao adicionar cotação:", error);
    throw new Error("Erro ao adicionar cotação");
  }
};


export const editQuotation = async (quotationId, updatedData, requestId) => {
  try {
    const quotationRef = doc(firestoreDb, "quotations", quotationId);
    await updateDoc(quotationRef, updatedData);

    
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


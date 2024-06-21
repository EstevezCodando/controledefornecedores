import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
} from "firebase/firestore";

export const addSupplier = async (supplierData) => {
  try {
    const docRef = await addDoc(collection(db, "suppliers"), supplierData);
    console.log("Fornecedor adicionado com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar fornecedor: ", e);
  }
};

export const updateSupplier = async (id, updatedData) => {
  try {
    const supplierRef = doc(db, "suppliers", id);
    await updateDoc(supplierRef, updatedData);
    console.log("Fornecedor atualizado com ID: ", id);
  } catch (e) {
    console.error("Erro ao atualizar fornecedor: ", e);
  }
};

export const getSuppliers = async () => {
  const suppliers = [];
  const querySnapshot = await getDocs(collection(db, "suppliers"));
  querySnapshot.forEach((doc) => {
    suppliers.push({ id: doc.id, ...doc.data() });
  });
  return suppliers;
};

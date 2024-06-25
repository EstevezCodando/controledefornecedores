import { db } from "../../firebase/config";

import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const addQuotation = async (quotationData) => {
  try {
    const docRef = await addDoc(collection(db, "quotations"), quotationData);
    console.log("Cotação adicionada com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar cotação: ", e);
  }
};

export const updateQuotation = async (id, updatedData) => {
  try {
    const quotationRef = doc(db, "quotations", id);
    await updateDoc(quotationRef, updatedData);
    console.log("Cotação atualizada com ID: ", id);
  } catch (e) {
    console.error("Erro ao atualizar cotação: ", e);
  }
};

export const getQuotations = async (filter) => {
  const quotations = [];
  let quotationsQuery = collection(db, "quotations");

  if (filter) {
    const filtersArray = [];
    if (filter.productId) {
      filtersArray.push(where("productId", "==", filter.productId));
    }
    if (filter.supplierId) {
      filtersArray.push(where("supplierId", "==", filter.supplierId));
    }
    if (filtersArray.length > 0) {
      quotationsQuery = query(quotationsQuery, ...filtersArray);
    }
  }

  const querySnapshot = await getDocs(quotationsQuery);
  querySnapshot.forEach((doc) => {
    quotations.push({ id: doc.id, ...doc.data() });
  });
  return quotations;
};

export const getQuotationsByProduct = async (productId) => {
  const quotations = [];
  const quotationsQuery = query(
    collection(db, "quotations"),
    where("productId", "==", productId)
  );
  const querySnapshot = await getDocs(quotationsQuery);
  querySnapshot.forEach((doc) => {
    quotations.push({ id: doc.id, ...doc.data() });
  });
  return quotations;
};

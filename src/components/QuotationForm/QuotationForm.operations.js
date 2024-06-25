import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
const db = getFirestore();

export const getQuotations = async (filter) => {
  const quotations = [];
  const querySnapshot = await getDocs(collection(db, "quotations"));
  querySnapshot.forEach((doc) => {
    quotations.push({ id: doc.id, ...doc.data() });
  });
  return quotations;
};

export const addQuotation = async (quotationData) => {
  try {
    const docRef = await addDoc(collection(db, "quotations"), quotationData);
    console.log("Quotation added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding quotation: ", e);
  }
};

export const updateQuotation = async (id, updatedData) => {
  try {
    const quotationRef = doc(db, "quotations", id);
    await updateDoc(quotationRef, updatedData);
    console.log("Quotation updated with ID: ", id);
  } catch (e) {
    console.error("Error updating quotation: ", e);
  }
};

export const deleteQuotation = async (id) => {
  try {
    await deleteDoc(doc(db, "quotations", id));
    console.log("Quotation deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting quotation: ", e);
  }
};

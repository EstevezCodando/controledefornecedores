import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
} from "firebase/firestore";

export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, "products"), productData);
    console.log("Produto adicionado com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar produto: ", e);
  }
};

export const updateProduct = async (id, updatedData) => {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, updatedData);
    console.log("Produto atualizado com ID: ", id);
  } catch (e) {
    console.error("Erro ao atualizar produto: ", e);
  }
};

export const getProducts = async () => {
  const products = [];
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};

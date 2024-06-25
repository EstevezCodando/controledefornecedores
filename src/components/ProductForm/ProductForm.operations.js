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

export const getProducts = async (filter) => {
  const products = [];
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};

export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, "products"), productData);
    console.log("Product added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding product: ", e);
  }
};

export const updateProduct = async (id, updatedData) => {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, updatedData);
    console.log("Product updated with ID: ", id);
  } catch (e) {
    console.error("Error updating product: ", e);
  }
};

export const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(db, "products", id));
    console.log("Product deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting product: ", e);
  }
};

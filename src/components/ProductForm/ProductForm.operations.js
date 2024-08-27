import { getSuppliers } from "../SupplierForm/SupplierForm.operations";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
const firestoreDb = getFirestore();

export const getProducts = async (filter = {}) => {
  const productsCollection = collection(firestoreDb, "products");
  const productsSnapshot = await getDocs(productsCollection);

  const suppliers = await getSuppliers(); // Buscar todos os fornecedores

  const products = productsSnapshot.docs.map((doc) => {
    const product = doc.data();
    return {
      id: doc.id,
      ...product,
      suppliers: product.suppliers.map(
        (supplierId) => suppliers.find((s) => s.id === supplierId)?.name || ""
      ), // Mapeia os IDs dos fornecedores para os nomes
    };
  });

  return products;
};

export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(
      collection(firestoreDb, "products"),
      productData
    );
    console.log("Product added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding product: ", e);
  }
};

export const updateProduct = async (id, updatedData) => {
  try {
    const productRef = doc(firestoreDb, "products", id);
    await updateDoc(productRef, updatedData);
    console.log("Product updated with ID: ", id);
  } catch (e) {
    console.error("Error updating product: ", e);
  }
};

export const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(firestoreDb, "products", id));
    console.log("Product deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting product: ", e);
  }
};

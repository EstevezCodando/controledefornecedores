import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { firestoreDb } from "../../firebase/config"; 

export const getSuppliers = async () => {
  const suppliers = [];
  const querySnapshot = await getDocs(collection(firestoreDb, "suppliers"));
  querySnapshot.forEach((doc) => {
    suppliers.push({ id: doc.id, ...doc.data() });
  });
  return suppliers;
};

export const addSupplier = async (supplierData) => {
  try {
    const docRef = await addDoc(collection(firestoreDb, "suppliers"), supplierData);
    console.log("Supplier added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding supplier: ", e);
  }
};

export const updateSupplier = async (id, updatedData) => {
  try {
    const supplierRef = doc(firestoreDb, "suppliers", id);
    await updateDoc(supplierRef, updatedData);
    console.log("Supplier updated with ID: ", id);
  } catch (e) {
    console.error("Error updating supplier: ", e);
  }
};



export const getSupplierDependencies = async (supplierId) => {
  const dependencies = {
    contacts: [],
    products: [],
    quotations: [],
  };

  const contactsQuery = query(
    collection(firestoreDb, "contacts"),
    where("supplierId", "==", supplierId)
  );
  const contactsSnapshot = await getDocs(contactsQuery);
  contactsSnapshot.forEach((doc) => dependencies.contacts.push(doc.data()));

  const productsQuery = query(
    collection(firestoreDb, "products"),
    where("supplierId", "==", supplierId)
  );
  const productsSnapshot = await getDocs(productsQuery);
  productsSnapshot.forEach((doc) => dependencies.products.push(doc.data()));

  const quotationsQuery = query(
    collection(firestoreDb, "quotations"),
    where("supplierId", "==", supplierId)
  );
  const quotationsSnapshot = await getDocs(quotationsQuery);
  quotationsSnapshot.forEach((doc) => dependencies.quotations.push(doc.data()));

  return dependencies;
};

export const deleteSupplier = async (supplierId) => {
  const contactsQuery = query(
    collection(firestoreDb, "contacts"),
    where("supplierId", "==", supplierId)
  );
  const contactsSnapshot = await getDocs(contactsQuery);
  contactsSnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });

  const productsQuery = query(
    collection(firestoreDb, "products"),
    where("supplierId", "==", supplierId)
  );
  const productsSnapshot = await getDocs(productsQuery);
  productsSnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });

  const quotationsQuery = query(
    collection(firestoreDb, "quotations"),
    where("supplierId", "==", supplierId)
  );
  const quotationsSnapshot = await getDocs(quotationsQuery);
  quotationsSnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });

  await deleteDoc(doc(firestoreDb, "suppliers", supplierId));
};

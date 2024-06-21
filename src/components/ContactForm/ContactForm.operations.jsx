import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore();

export const addContact = async (contactData) => {
  try {
    const docRef = await addDoc(collection(db, "contacts"), contactData);
    console.log("Contact added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding contact: ", e);
  }
};

export const updateContact = async (id, updatedData) => {
  try {
    const contactRef = doc(db, "contacts", id);
    await updateDoc(contactRef, updatedData);
    console.log("Contact updated with ID: ", id);
  } catch (e) {
    console.error("Error updating contact: ", e);
  }
};

export const getContacts = async (supplierId) => {
  const contacts = [];
  const q = supplierId
    ? query(collection(db, "contacts"), where("supplierId", "==", supplierId))
    : collection(db, "contacts");
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    contacts.push({ id: doc.id, ...doc.data() });
  });
  return contacts;
};

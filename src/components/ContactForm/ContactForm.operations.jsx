import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const firestoreDb = getFirestore();

export const addContact = async (contactData) => {
  try {
    const docRef = await addDoc(
      collection(firestoreDb, "contacts"),
      contactData
    );
    console.log("Contact added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding contact: ", e);
  }
};

export const updateContact = async (id, updatedData) => {
  try {
    const contactRef = doc(firestoreDb, "contacts", id);
    await updateDoc(contactRef, updatedData);
    console.log("Contact updated with ID: ", id);
  } catch (e) {
    console.error("Error updating contact: ", e);
  }
};

export const deleteContact = async (id) => {
  try {
    await deleteDoc(doc(firestoreDb, "contacts", id));
    console.log("Contact deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting contact: ", e);
  }
};

export const getContacts = async (supplierId) => {
  const contacts = [];
  const q = supplierId
    ? query(
        collection(firestoreDb, "contacts"),
        where("supplierId", "==", supplierId)
      )
    : collection(firestoreDb, "contacts");
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    contacts.push({ id: doc.id, ...doc.data() });
  });
  return contacts;
};

import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { firestoreDb } from "../../firebase/config";


export const createRequest = async (requestData) => {
  try {
    const docRef = await addDoc(
      collection(firestoreDb, "requests"),
      requestData
    );
    console.log("Request added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding request:", error);
  }
};

export const updateRequest = async (id, updatedData) => {
  try {
    const requestRef = doc(firestoreDb, "requests", id);
    await updateDoc(requestRef, updatedData);
    console.log("Request updated with ID:", id);
  } catch (error) {
    console.error("Error updating request:", error);
  }
};

export const deleteRequest = async (id) => {
  try {
    await deleteDoc(doc(firestoreDb, "requests", id));
    console.log("Request deleted with ID:", id);
  } catch (error) {
    console.error("Error deleting request:", error);
  }
};

export const getRequests = async (userEmail) => {
  try {
    const q = query(
      collection(firestoreDb, "requests"),
      where("userEmail", "==", userEmail)
    );
    const querySnapshot = await getDocs(q);
    const requests = [];
    querySnapshot.forEach((doc) => {
      requests.push({ id: doc.id, ...doc.data() });
    });
    return requests;
  } catch (error) {
    console.error("Error getting requests:", error);
    return [];
  }
};

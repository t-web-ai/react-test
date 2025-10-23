import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { firestore as db } from "./firebase";

const { VITE_COLLECTION: collection_name } = import.meta.env;

export async function create_user(name, address) {
  const usersRef = collection(db, collection_name);
  try {
    // query
    const q = query(
      usersRef,
      where("name", "==", name),
      where("address", "==", address)
    );

    // get document
    const querySnapshot = await getDocs(q);

    // if the document already exists
    if (!querySnapshot.empty)
      return Promise.resolve({
        status: false,
        message: "This user is already registered.",
      });

    // unless
    const docRef = await addDoc(usersRef, {
      name,
      address,
      yearlyStatus: {},
      monthlyStatus: {},
      dailyStatus: {},
      createdAt: new Date(),
    });
    return Promise.resolve({
      status: true,
      message: "New user created successfully!",
    });
  } catch (error) {
    return Promise.resolve({
      status: false,
      message: "Something went wrong. Please try again later.",
    });
  }
}

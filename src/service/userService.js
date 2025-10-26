import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  increment,
  updateDoc,
  setDoc,
  serverTimestamp,
  getDocFromServer,
} from "firebase/firestore";
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

export async function get_users_list() {
  const userRef = collection(db, collection_name);

  try {
    const documents = await getDocs(userRef);

    const users = documents.docs.map((user) => {
      return {
        id: user.id,
        data: user.data(),
      };
    });
    return Promise.resolve(users);
  } catch (error) {
    return Promise.resolve({
      status: false,
      message: "Internal server error!",
    });
  }
}

export async function add_item({ id, type, quantity, price }) {
  const total = parseInt(quantity) * parseInt(price);
  const docRef = doc(db, collection_name, id);
  try {
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("User is not found");
    }

    await setDoc(docRef, { createdAt: serverTimestamp() }, { merge: true });
    const docSnapp = await getDocFromServer(docRef);

    const data = docSnapp.data() || {};

    if (!data.createdAt) {
      throw new Error("Server is busy. Please try again!");
    }
    const server = data.createdAt.toDate();
    const development = new Date();
    const time = import.meta.env.VITE_DEVELOPMENT ? development : server;

    const now = new Date(time);
    const year = now.getFullYear();
    const month = `${year}-${(now.getMonth() + 1).toString().padStart(2, "0")}`;
    const day = `${month}-${now.getDate().toString().padStart(2, "0")}`;

    const nextEventId = crypto.randomUUID();

    const updates = {
      [`yearlyStatus.${year}.quantity`]: increment(quantity),
      [`yearlyStatus.${year}.total`]: increment(total),

      [`monthlyStatus.${month}.quantity`]: increment(quantity),
      [`monthlyStatus.${month}.total`]: increment(total),

      [`dailyStatus.${day}.${nextEventId}`]: { type, quantity, price, total },
    };

    await updateDoc(docRef, updates);

    return Promise.resolve({
      status: true,
      message: "Successfully added the item!",
    });
  } catch (error) {
    return Promise.resolve({
      status: false,
      message: error.message,
    });
  }
}

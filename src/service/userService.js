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
  orderBy,
  limit,
  getCountFromServer,
  endBefore,
  startAfter,
  limitToLast,
} from "firebase/firestore";
import { firestore as db } from "./firebase";
import { v4 as uuidv4 } from "uuid";

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
    // Check if user exists
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("User is not found!");

    // Ensure server timestamp
    await setDoc(docRef, { createdAt: serverTimestamp() }, { merge: true });
    const docSnapp = await getDocFromServer(docRef);
    const data = docSnapp.data() || {};

    if (!data.createdAt) throw new Error("Server is busy. Please try again!");

    // Use server time or local dev time
    const serverTime = data.createdAt.toDate();
    const now = import.meta.env.VITE_DEVELOPMENT
      ? new Date()
      : new Date(serverTime);

    const year = now.getFullYear();
    const month = `${year}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const day = `${month}-${String(now.getDate()).padStart(2, "0")}`;

    const nextEventId = uuidv4();

    // Build update object
    const updates = {
      // daily details
      [`dailyStatus.${day}.${nextEventId}`]: { type, quantity, price, total },

      // total price
      [`dailyTotals.${day}`]: increment(total),
      [`monthlyTotals.${month}`]: increment(total),
      [`yearlyTotals.${year}`]: increment(total),

      // total quantity
      [`dailyQuantityTotals.${day}`]: increment(quantity),
      [`monthlyQuantityTotals.${month}`]: increment(quantity),
      [`yearlyQuantityTotals.${year}`]: increment(quantity),
    };

    await updateDoc(docRef, updates);

    return {
      status: true,
      message: "Successfully added the item!",
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

export async function history({ year, month, day, filter, action, cursorRef }) {
  const userRef = collection(db, collection_name);
  const pageLimit = Number(import.meta.env.VITE_USER_PER_PAGE ?? 10);

  // Determine field & date based on filter
  const fieldMap = {
    daily: `dailyQuantityTotals.${day}`,
    monthly: `monthlyQuantityTotals.${month}`,
    yearly: `yearlyQuantityTotals.${year}`,
  };

  const field = fieldMap[filter];
  const date = { daily: day, monthly: month, yearly: year }[filter];

  if (!field) return;

  // Pagination query builder
  const baseQuery = [userRef, orderBy(field, "desc")];

  const paginate =
    action === "next"
      ? query(...baseQuery, startAfter(cursorRef?.last), limit(pageLimit))
      : action === "previous"
      ? query(...baseQuery, endBefore(cursorRef?.first), limitToLast(pageLimit))
      : query(...baseQuery, limit(pageLimit));

  //  Count query (optional but separate)
  const countQuery = query(userRef, orderBy(field, "desc"));

  //  Execute both in parallel
  const [userSnap, countSnap] = await Promise.all([
    getDocs(paginate),
    getCountFromServer(countQuery),
  ]);

  //  Map user data
  const users = userSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Cursor references
  const first = userSnap.docs[0];
  const last = userSnap.docs[userSnap.docs.length - 1];

  return {
    users,
    cursor: { first, last },
    date,
    count: countSnap.data().count,
  };
}

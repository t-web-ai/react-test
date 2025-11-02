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
  arrayUnion,
  deleteDoc,
  arrayRemove,
  writeBatch,
} from "firebase/firestore";
import { firestore as db } from "./firebase";
import { v4 as uuidv4 } from "uuid";

export const {
  VITE_COLLECTION: collection_name,
  VITE_DOCUMENT: document_name,
} = import.meta.env;

export async function create_user(name, address, user_id) {
  const usersRef = collection(db, collection_name);
  try {
    // query
    const q = query(
      usersRef,
      where("name_lowercase", "==", String(name).trim().toLowerCase()),
      where("address_lowercase", "==", String(address).trim().toLowerCase())
    );

    // get document
    const querySnapshot = await getDocs(q);

    // if the document already exists
    if (!querySnapshot.empty)
      return Promise.resolve({
        status: false,
        message: "This user is already registered.",
      });

    if (user_id) {
      const batch = writeBatch(db);
      // update user with id ( batch one )
      batch.update(doc(db, collection_name, user_id), {
        name: String(name).trim(),
        address: String(address).trim(),
        name_lowercase: String(name).toLowerCase().trim(),
        address_lowercase: String(address).toLowerCase().trim(),
      });

      // find user array document
      const userDocRef = doc(db, collection_name, document_name);
      const userSnap = await getDoc(userDocRef);
      if (!userSnap.exists()) {
        return Promise.resolve({
          status: false,
          message: "User is not found",
        });
      }

      // filter user
      const updatedUserList = userSnap
        .data()
        .user_array.filter((user) => user.id != user_id);

      // update user array document with filter array ( batch two )
      batch.update(userDocRef, {
        user_array: [...updatedUserList, ...[{ id: user_id, name, address }]],
      });

      // commit batch
      await batch.commit();
      return Promise.resolve({
        status: true,
        message: "Updated user successfully!",
      });
    }

    // unless
    const batch = writeBatch(db);
    const userDocRef = doc(usersRef);

    // create new user ( batch one )
    batch.set(userDocRef, {
      name: String(name).trim(),
      address: String(address).trim(),
      name_lowercase: String(name).trim().toLowerCase(),
      address_lowercase: String(address).trim().toLowerCase(),
    });
    // add user information to user array document
    batch.set(
      doc(db, collection_name, document_name),
      {
        user_array: arrayUnion({
          id: userDocRef.id, // use the new doc ID
          name: String(name).trim(),
          address: String(address).trim(),
        }),
      },
      { merge: true }
    );
    // commit batch
    await batch.commit();
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

export async function get_users_list(search) {
  const userRef = collection(db, collection_name);

  try {
    if (!search) {
      const userListRef = doc(db, collection_name, document_name);
      const documents = await getDoc(userListRef);
      const users = documents.data().user_array;
      return Promise.resolve(users);
    }
    const usersQuery = query(
      userRef,
      where("name_lowercase", ">=", String(search).trim().toLowerCase()),
      where(
        "name_lowercase",
        "<=",
        String(search).trim().toLowerCase() + "\uf8ff"
      )
    );
    const usersDocuemnt = await getDocs(usersQuery);
    const users = usersDocuemnt.docs.map((user) => {
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

export function PFormat(value) {
  return String(value).padStart(2, "0");
}

export async function history({ year, month, day, filter, action, cursorRef }) {
  const userRef = collection(db, collection_name);
  const pageLimit = Number(import.meta.env.VITE_USER_PER_PAGE ?? 10);

  const now = new Date().toLocaleDateString().split("/");
  const today = `${now[2]}-${PFormat(now[0])}-${PFormat(now[1])}`;

  function get_daily_action() {
    if (today == day) return "createdAt";
    return `dailyQuantityTotals.${day}`;
  }
  // Determine field & date based on filter
  const fieldMap = {
    daily: get_daily_action(),
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

export async function deleteUserFromServer({ id, user: { name, address } }) {
  const userDocRef = doc(db, collection_name, id);
  try {
    const batch = writeBatch(db);
    // delete user from user collection ( batch one )
    batch.delete(userDocRef);
    const userListDocRef = doc(db, collection_name, document_name);
    const userListSnap = await getDoc(userListDocRef);
    // delete user information from user array document ( batch two )
    batch.update(userListDocRef, {
      user_array: arrayRemove({ id, name, address }),
    });
    // commit batch
    await batch.commit();
    return { status: true, message: "Deleted the user successfully!" };
  } catch ({ message }) {
    return { status: false, message };
  }
}

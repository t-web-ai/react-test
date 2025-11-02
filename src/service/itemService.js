import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import { collection_name } from "./userService";
import { firestore as db } from "./firebase";

export const DeleteItemFromUI = ({ id, selector, user, setUser }) => {
  const clone = { ...user };
  const { quantity, total } = clone.dailyStatus?.[selector]?.[id];

  const daily = {
    total: (clone.dailyTotals[selector] || 0) - total,
    quantity: (clone.dailyQuantityTotals[selector] || 0) - quantity,
  };

  delete user.dailyStatus[selector][id];

  if (daily.quantity <= 0) return setUser(null);
  clone.dailyQuantityTotals[selector] = daily.quantity;
  clone.dailyTotals[selector] = daily.total;
  setUser(clone);
};

export const DeleteItemFromServer = async ({ id, selector, user }) => {
  try {
    const userRef = doc(db, collection_name, user.id);

    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) throw new Error("Not Exists");

    const userDoc = docSnap.data();

    const { quantity, total } = userDoc.dailyStatus?.[selector]?.[id];

    // client time
    const now = selector.split("-");
    const month = now.slice(0, 2).join("-");
    const year = now.slice(0, 1).join("-");

    // server time
    const current = new Date().toLocaleDateString().split("/");
    const today = `${current[2]}-${current[0]}-${current[1]}`;

    const daily = {
      total: (userDoc.dailyTotals[selector] || 0) - total,
      quantity: (userDoc.dailyQuantityTotals[selector] || 0) - quantity,
    };

    const monthly = {
      total: (userDoc.monthlyTotals[month] || 0) - total,
      quantity: (userDoc.monthlyQuantityTotals[month] || 0) - quantity,
    };

    const yearly = {
      total: (userDoc.yearlyTotals[year] || 0) - total,
      quantity: (userDoc.yearlyQuantityTotals[year] || 0) - quantity,
    };

    let updateConfig = {
      [`dailyStatus.${selector}.${id}`]: deleteField(),

      [`dailyQuantityTotals.${selector}`]:
        daily.quantity > 0 ? daily.quantity : deleteField(),
      [`dailyTotals.${selector}`]:
        daily.total > 0 ? daily.total : deleteField(),

      [`monthlyTotals.${month}`]:
        monthly.total > 0 ? monthly.total : deleteField(),
      [`monthlyQuantityTotals.${month}`]:
        monthly.quantity > 0 ? monthly.quantity : deleteField(),

      [`yearlyTotals.${year}`]: yearly.total > 0 ? yearly.total : deleteField(),
      [`yearlyQuantityTotals.${year}`]:
        yearly.quantity > 0 ? yearly.quantity : deleteField(),
    };
    if (daily.quantity <= 0 && today == now.join("-")) {
      updateConfig = { ...updateConfig, ...{ createdAt: deleteField() } };
    }
    await updateDoc(userRef, updateConfig);
    return { status: true, message: "Deleted the item successfully!" };
  } catch ({ message }) {
    console.log(message);
    return { status: false, message };
  }
};

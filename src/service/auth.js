import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { success, failed } from "../components/Toast";

const id = "AUTH";

export async function login(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    success("You’re now logged in", id);
  } catch (ex) {
    failed("Invalid Credentials", id);
  }
}
export async function logout() {
  try {
    await signOut(auth);
    success("You’ve successfully logged out.", id);
  } catch (ex) {
    failed("Please try again", id);
  }
}

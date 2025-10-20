import { useEffect } from "react";
import { logout } from "../service/auth";

async function Logout() {
  useEffect(() => {
    logout();
  });
  return null;
}

export default Logout;

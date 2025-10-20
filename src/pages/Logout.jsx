import { useEffect, useState } from "react";
import { logout } from "../service/auth";

async function Logout() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    logout();
  });
  return null;
}

export default Logout;

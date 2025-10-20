import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../service/firebase";

export const UserContext = createContext();
UserContext.displayName = "UserContext";

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, function (current) {
      setUser(current);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

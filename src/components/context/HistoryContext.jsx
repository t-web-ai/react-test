import { createContext } from "react";

export const HistoryContext = createContext();
HistoryContext.displayName = "History Context";

export const HistoryContextProvider = function ({ children, value }) {
  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
};

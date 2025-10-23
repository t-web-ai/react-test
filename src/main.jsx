import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import RouteMethod from "./components/router/RouteMethod.jsx";
import { UserContextProvider } from "./components/context/UserContext.jsx";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById("root")).render(
  <RouteMethod>
    <UserContextProvider>
      <Toaster />
      <App />
    </UserContextProvider>
  </RouteMethod>
);

import { BrowserRouter } from "react-router";
function RouteMethod({ children }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

export default RouteMethod;

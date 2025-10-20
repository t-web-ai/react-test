import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/router/ProtectedRoute";
import Header from "./layouts/header";
import Logout from "./pages/Logout";
import History from "./pages/History";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Header />}>
          <Route path="/dashboard">
            <Route path="" element={<Dashboard />} />
            <Route path="history" element={<History />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

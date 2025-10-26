import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/router/ProtectedRoute";
import Header from "./layouts/Header";
import Logout from "./pages/Logout";
import History from "./pages/manage/History";
import NotFound from "./pages/NotFound";
import CreateUser from "./pages/manage/CreateUser";
import CreateItem from "./pages/manage/CreateItem";
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

            <Route path="users/create" element={<CreateUser />} />
            <Route path="items/create" element={<CreateItem />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

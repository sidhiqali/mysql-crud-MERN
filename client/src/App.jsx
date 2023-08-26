import { Route, Routes } from "react-router-dom";
import Home from "./pages/Main";
import Add from "./pages/Add";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProvider from "./context/userContext";
import AdminLanding from "./pages/AdminLanding";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/add"
          element={<Add />}
        />
        <Route
          path="/update/:id"
          element={<Add />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/admin/dashboard"
          element={<AdminLanding />}
        />
      </Routes>
    </UserProvider>
  );
}

export default App;

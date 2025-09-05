import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import TasksPage from "./pages/TasksPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tasks" element={<TasksPage />} />
    </Routes>
  );
}






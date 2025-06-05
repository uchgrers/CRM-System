import "./App.css";
import { Route, Routes } from "react-router-dom";
import TodosPage from "./pages/TodosPage";
import AuthPage from "./pages/AuthPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodosPage />} />
      <Route path="/todos" element={<TodosPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/*" element={<div>Not found</div>} />
    </Routes>
  );
}

export default App;

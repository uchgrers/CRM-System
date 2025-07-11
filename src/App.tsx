import "./App.css";
import { Route, Routes } from "react-router-dom";
import TodosPage from "./pages/TodosPage";
import AuthPage from "./pages/AuthPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import { useEffect, useState } from "react";
import { refreshThunk } from "./state_manager/authSlice";
import { useAppDispatch } from "./hooks";
import { ProtectedRoute } from "./utils/ProtectedRoute";

function App() {
  const dispatch = useAppDispatch();

  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const checkIfTokenIsValid = async () => {
      setIsPending(false);
      try {
        if (localStorage.getItem("refreshToken")) {
          setIsPending(true);
          await dispatch(
            refreshThunk(localStorage.getItem("refreshToken") || "")
          );
        }
      } catch (error) {
        throw error;
      } finally {
        setIsPending(false);
      }
    };

    checkIfTokenIsValid();
  }, []);

  if (isPending) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route
        path="/todos"
        element={
          <ProtectedRoute>
            <TodosPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="/*" element={<div>Not found</div>} />
    </Routes>
  );
}

export default App;

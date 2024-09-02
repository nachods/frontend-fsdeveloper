import React, { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import RegistrationForm from "../pages/register/RegistrationForm";
import LoginForm from "../pages/login/LoginForm";
import { AuthContext } from "../context/AuthContext";
import HomePage from "../pages/home/HomePage";
import MenuPage from "../pages/menues/MenuPage";
import PayoutPage from "../pages/payout/PayoutPage";
import AdminPage from "../pages/admin/AdminPage";
import NavBar from "../components/Navbar/NavBar";

const AppRouter = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Mostrar el NavBar solo si el usuario está autenticado y no está en las páginas de login o registro
  const showNavBar = user && location.pathname !== "/" && location.pathname !== "/login";

  return (
    <>
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<LoginForm />} />
        {user && (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/payout" element={<PayoutPage />} />
            <Route path="/menu" element={<MenuPage />} />
            {user.admin && <Route path="/admin" element={<AdminPage />} />}
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRouter;

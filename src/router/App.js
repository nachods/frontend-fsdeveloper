import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import RegistrationForm from "../pages/register/RegistrationForm";
import LoginForm from "../pages/login/LoginForm";
import HomePage from "../pages/home/HomePage";
import NavBar from "../components/Navbar/NavBar";

const AppRouter = () => {
  const location = useLocation();
  const hideNavBar = location.pathname === '/' || location.pathname === '/login'; //evito que el navbar aparezcan en el login y register
  return (
    <>
      {!hideNavBar && <NavBar />} 
      <Routes>
        <Route path='/' element={<RegistrationForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='*' element={<LoginForm />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </>
  );
};

export default AppRouter;

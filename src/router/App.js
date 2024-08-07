import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegistrationForm from '../pages/register/RegistrationForm';
import LoginForm from '../pages/login/LoginForm';

const AppRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<RegistrationForm/>} />
        <Route path='/login' element={<LoginForm/>} />
        <Route path='*' element={<LoginForm/>} />
    </Routes>
  )
}

export default AppRouter
import { Route, Routes } from 'react-router-dom';

import { Dashboard } from '../pages/dashboard';
import { Login } from '../pages/login';
import { Register } from '../pages/register';

export const AppRoutes = () => (
  <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
);

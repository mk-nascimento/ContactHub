import { Route, Routes } from 'react-router-dom';

import { Dashboard } from '../pages/dashboard';
import { Login } from '../pages/login';
import { Profile } from '../pages/profile';
import { Register } from '../pages/register';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/register" element={<Register />} />
  </Routes>
);

import { Route, Routes } from 'react-router-dom';
import { Authenticated } from '../components/Authenticated';
import { Pathnames } from '../enums';
import { Dashboard } from '../pages/Dashboard';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

export const AppRoutes = () => (
  <Routes>
    <Route path={Pathnames.Index} element={<Authenticated />}>
      <Route index element={<h1>HOMEPAGE</h1>} />
    </Route>

    <Route path={Pathnames.Dashboard} element={<Dashboard />} />
    <Route path={Pathnames.Login} element={<Login />} />
    <Route path={Pathnames.Register} element={<Register />} />
  </Routes>
);

import { Route, Routes } from 'react-router-dom';
import { Authenticated } from 'src/components/Authenticated';
import { Pathnames } from 'src/enums';
import { Dashboard } from 'src/pages/Dashboard';
import { Homepage } from 'src/pages/Homepage';
import { Login } from 'src/pages/Login';
import { Register } from 'src/pages/Register';

export const AppRoutes = () => (
  <Routes>
    <Route path={Pathnames.Homepage} element={<Authenticated />}>
      <Route index element={<Homepage />} />
    </Route>

    <Route path={Pathnames.Dashboard} element={<Dashboard />} />
    <Route path={Pathnames.Login} element={<Login />} />
    <Route path={Pathnames.Register} element={<Register />} />
  </Routes>
);

import { Route, Routes } from 'react-router-dom';
import { Authenticated } from './components/Authenticated';
import { Pathnames } from './enums';
import { Dashboard } from './pages/Dashboard';
import { Homepage } from './pages/Homepage';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Register } from './pages/Register';

const App = () => (
  <Routes>
    <Route path={Pathnames.Homepage} element={<Authenticated />}>
      <Route index element={<Homepage />} />
      <Route path={Pathnames.Profile} element={<Profile />} />
    </Route>

    <Route path={Pathnames.Dashboard} element={<Dashboard />} />
    <Route path={Pathnames.Login} element={<Login />} />
    <Route path={Pathnames.Register} element={<Register />} />
  </Routes>
);

export default App;

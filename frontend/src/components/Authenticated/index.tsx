import { AxiosError, HttpStatusCode } from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Endpoints, Pathnames } from '../../enums';
import { useRequest } from '../../hooks/useRequest';
import axios from '../../services/axios';

export const Authenticated = () => {
  const token = Cookies.get('token');

  const navigate = useNavigate();
  const { error, request } = useRequest();

  useEffect(() => {
    if (token) {
      (async () => await request(() => axios.get(Endpoints.Validate)))();
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    if (error instanceof AxiosError && error.response?.status === HttpStatusCode.Unauthorized) navigate(Pathnames.Dashboard);
  }, [error, navigate, request, token]);

  return token ? <Outlet /> : <Navigate to={Pathnames.Login} />;
};

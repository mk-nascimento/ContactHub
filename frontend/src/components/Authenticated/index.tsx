import { AxiosError, HttpStatusCode } from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Endpoints, Pathnames } from 'src/enums';
import { useRequest } from 'src/hooks/useRequest';
import axios from 'src/services/axios';

export const Authenticated = () => {
  const cookieToken = Cookies.get('token');
  const [token, setToken] = useState(cookieToken);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  useEffect(() => {
    if (cookieToken) setToken((prev) => (cookieToken !== prev ? cookieToken : prev));
  }, [cookieToken]);

  const navigate = useNavigate();
  const { error, request } = useRequest();

  useEffect(() => {
    if (token) {
      (async () => await request(() => axios.get(Endpoints.Validate)))();
    }
  }, [request, token]);

  useEffect(() => {
    if (error instanceof AxiosError && error.response?.status === HttpStatusCode.Unauthorized) navigate(Pathnames.Dashboard);
  }, [error, navigate]);

  return token ? <Outlet /> : <Navigate to={Pathnames.Login} />;
};

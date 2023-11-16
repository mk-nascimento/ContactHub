import { AxiosError, HttpStatusCode } from 'axios';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Endpoints, Pathnames } from 'src/enums';
import { useAuth } from 'src/hooks/useAuth';
import { useRequest } from 'src/hooks/useRequest';
import axios from 'src/services/axios';

export const Authenticated = () => {
  const { request, response } = useRequest(true);
  const { error } = response;
  const { authenticator } = useAuth();
  const { logout, token } = authenticator;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  useEffect(() => {
    request({ url: Endpoints.Validate });
  }, [request]);

  useEffect(() => {
    if (error instanceof AxiosError && error.response?.status === HttpStatusCode.Unauthorized) logout();
  }, [error, logout]);

  return token ? <Outlet /> : <Navigate to={Pathnames.Login} />;
};

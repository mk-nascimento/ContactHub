import { HttpStatusCode } from 'axios';
import Cookies from 'js-cookie';
import { createContext, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Endpoints, Pathnames } from 'src/enums';
import { useRequest } from 'src/hooks/useRequest';
import { TLoginData } from 'src/schemas';
import axios from 'src/services/axios';
import { IProviderProps } from './interface.provider.global';

interface Authenticator {
  login(data: TLoginData): Promise<void>;
  logout(): Promise<void>;
}

interface AuthContextsValues {
  authenticator: Authenticator;
}

export const AuthContext = createContext({} as AuthContextsValues);

export const AuthProvider = ({ children }: IProviderProps) => {
  const navigate = useNavigate();
  const { data, request, status } = useRequest<{ token: string }>();

  useEffect(() => {
    if (status === HttpStatusCode.Ok) {
      Cookies.set('token', data!.token, { secure: true, sameSite: 'Lax' });
      navigate(Pathnames.Homepage);
    }
  }, [data, navigate, status]);

  const login = useCallback(
    async (payload: TLoginData) => await request(() => axios.post(Endpoints.Login, payload)),
    [request],
  );

  const logout = useCallback(async () => navigate(Pathnames.Dashboard), [navigate]);

  const authenticator = useMemo(() => ({ login, logout }), [login, logout]);

  const values = useMemo(() => ({ authenticator }), [authenticator]);
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

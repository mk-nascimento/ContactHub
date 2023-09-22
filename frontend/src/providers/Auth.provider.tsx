import Cookies from 'js-cookie';
import React, { createContext, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pathnames } from '../enums';
import { useRequest } from '../hooks/useRequest';
import { TLoginData } from '../schemas';
import axios from '../services/axios';

interface AuthProviderChildren {
  children: React.ReactNode;
}

interface Authenticator {
  login(data: TLoginData): Promise<void>;
  logout(): Promise<void>;
}

interface AuthContextsValues {
  authenticator: Authenticator;
}

export const AuthContext = createContext({} as AuthContextsValues);

export const AuthProvider = ({ children }: AuthProviderChildren) => {
  const navigate = useNavigate();
  const { data: loginData, request } = useRequest<{ token: string }>();

  const login = useCallback(
    async (data: TLoginData) => {
      await request(() => axios.post('auth/login', data));

      if (loginData?.token) {
        Cookies.set('token', loginData.token, { secure: true, sameSite: 'Lax' });
        navigate(Pathnames.Homepage);
      }
    },
    [loginData, navigate, request],
  );

  const logout = useCallback(async () => navigate(Pathnames.Dashboard), [navigate]);

  const authenticator = useMemo(() => ({ login, logout }), [login, logout]);

  const values = useMemo(() => ({ authenticator }), [authenticator]);
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

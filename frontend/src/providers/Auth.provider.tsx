import React, { createContext } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { TLoginData } from '../schemas';
import api from '../services/axios';

export interface AuthContextsValues {
  login: (data: TLoginData) => Promise<void>;
  logout: () => Promise<void>;
}

export interface AuthProviderChildren {
  children: React.ReactNode;
}
interface LoginResponse {
  token: string;
}

export const AuthContext = createContext({} as AuthContextsValues);

export const AuthProvider = ({ children }: AuthProviderChildren) => {
  const navigate: NavigateFunction = useNavigate();

  // useEffect(() => {
  //   if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;

  //   (async () => {
  //     try {
  //       await api.get('auth/validate/');
  //     } catch (error) {
  //       if (error instanceof AxiosError && error.response?.status === 401 && (pathname === '/dashboard' || pathname === '/profile')) navigate('/');
  //     }
  //   })();
  // }, [navigate, pathname, token]);

  const login = async (data: TLoginData): Promise<void> => {
    try {
      const {
        data: { token },
      } = await api.post<LoginResponse>('auth/login/', data);

      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem('@fullstack-challenge:token', token);

      if (token) navigate('dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => navigate('/');

  const values = { login, logout };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

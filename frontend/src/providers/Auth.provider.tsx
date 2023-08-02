import { AxiosError } from 'axios';
import React, { createContext, useEffect } from 'react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

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
  const { pathname }: Partial<Location> = useLocation();
  const token: string | null = localStorage.getItem('@fullstack-challenge:token');

  useEffect(() => {
    if (!token) navigate('/');
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    (async () => {
      try {
        await api.get('validate/');
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401 && pathname !== '/') navigate('/');
      }
    })();
  }, [navigate, pathname, token]);

  const login = async (data: TLoginData): Promise<void> => {
    try {
      const response = await api.post<LoginResponse>('login/', data);

      const { token } = response.data;

      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem('@fullstack-challenge:token', token);

      if (token) navigate('dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => console.log('logout');

  const values = { login, logout };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

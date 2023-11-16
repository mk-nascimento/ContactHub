import { HttpStatusCode } from 'axios';
import Cookies from 'js-cookie';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { AppVariables, Endpoints } from 'src/enums';
import { useRequest } from 'src/hooks/useRequest';
import { TLoginData } from 'src/schemas';
import { IProviderProps } from './interface.provider.global';

interface Authenticator {
  login(data: TLoginData): Promise<void>;
  logout(): void;
  token?: string;
}

interface AuthContextsValues {
  authenticator: Authenticator;
}

export const AuthContext = createContext({} as AuthContextsValues);
export const AuthProvider = ({ children }: IProviderProps) => {
  const [authToken, setAuthToken] = useState<string | undefined>(Cookies.get(AppVariables.KeyToken));
  const { request: req, response } = useRequest<{ token: string }, TLoginData>();
  const { data, status } = response;

  useEffect(() => {
    if (status === HttpStatusCode.Ok) setAuthToken(data?.token);
  }, [data, status]);

  useEffect(() => {
    if (authToken) Cookies.set(AppVariables.KeyToken, authToken, { secure: true, sameSite: 'Lax' });
    else Cookies.remove(AppVariables.KeyToken);
  }, [authToken]);

  const login = useCallback(
    (data: TLoginData) => req({ method: 'POST', url: Endpoints.Login, data }, 'Login successful'),
    [req],
  );
  const logout = useCallback(() => {
    setAuthToken(undefined);
    toast.warning('Your session was disconnected', { autoClose: 1500 });
  }, []);

  const authenticator: Authenticator = useMemo(() => ({ login, logout, token: authToken }), [login, logout, authToken]);

  const values: AuthContextsValues = useMemo(() => ({ authenticator }), [authenticator]);
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

import { HttpStatusCode } from 'axios';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Endpoints } from 'src/enums';
import { useAuth } from 'src/hooks/useAuth';
import { useRequest } from 'src/hooks/useRequest';
import { IUser, IUserProfile } from 'src/interfaces';
import { TUserData } from 'src/schemas';
import { IProviderProps } from './interface.provider.global';

interface IUserService {
  register(data: TUserData): Promise<void>;
  retrieve(): Promise<void>;
  update(updateData: Partial<TUserData>): Promise<void>;
  destroy(): Promise<void>;
}

interface IUserContextValues {
  userService: IUserService;
  profile: IUserProfile | null;
}

export const UserContext = createContext({} as IUserContextValues);

export const UserProvider = ({ children }: IProviderProps) => {
  const { request: createUser, response: crResponse } = useRequest<IUser, TUserData>();
  const { request: retrieveUser, response: retResponse } = useRequest<IUserProfile>(true);
  const { data: profile } = retResponse;
  const { request: updateUser, response: updResponse } = useRequest<IUser, Partial<TUserData>>();
  const { request: deleteUser, response: delResponse } = useRequest();
  const [loginPayload, setLoginPayload] = useState<Pick<TUserData, 'email' | 'password'>>();
  const { authenticator } = useAuth();
  const { login, logout } = authenticator;

  useEffect(() => {
    if (crResponse.status === HttpStatusCode.Created) login(loginPayload!);
  }, [login, loginPayload, crResponse.status]);
  useEffect(() => {
    if (delResponse.status === HttpStatusCode.NoContent) logout();
  }, [logout, delResponse.status]);

  const register = useCallback(
    async (data: TUserData) => {
      await createUser({ method: 'POST', url: Endpoints.User, data });
      setLoginPayload({ email: data.email, password: data.password });
    },
    [createUser],
  );

  const retrieve = useCallback(async () => await retrieveUser({ url: Endpoints.Profile }), [retrieveUser]);
  useEffect(() => {
    if (updResponse.status === HttpStatusCode.Ok) retrieve();
  }, [retrieve, updResponse.status]);

  const update = useCallback(
    async (data: Partial<TUserData>) =>
      await updateUser({ method: 'PATCH', url: `${Endpoints.User}/${retResponse.data?.id}`, data }),
    [retResponse.data, updateUser],
  );

  const destroy = useCallback(
    async () => await deleteUser({ method: 'DELETE', url: `${Endpoints.User}/${retResponse.data?.id}` }),
    [retResponse.data, deleteUser],
  );

  const userService: IUserService = useMemo(
    () => ({ register, retrieve, update, destroy }),
    [register, retrieve, update, destroy],
  );

  const values: IUserContextValues = useMemo(() => ({ profile, userService }), [profile, userService]);
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

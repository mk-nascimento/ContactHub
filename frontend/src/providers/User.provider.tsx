import { HttpStatusCode } from 'axios';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Endpoints, Pathnames } from 'src/enums';
import { useRequest } from 'src/hooks/useRequest';
import { Contact } from 'src/interfaces';
import { TUserData } from 'src/schemas';
import axios from 'src/services/axios';
import { IProviderProps } from './interface.provider.global';

interface UserResponse {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: Date;
}

interface UserProfile extends UserResponse {
  contacts: Contact[];
}

interface UserService {
  profile(): Promise<void>;
  register(data: TUserData): Promise<void>;
  update(updateData: TUserData): Promise<void>;
  destroy(): Promise<void>;
}

interface ReturnData {
  profile: UserProfile | null;
}

interface Errors {
  [key: string]: unknown;
}

interface UserContextValues {
  userService: UserService;
  data: ReturnData;
  errors: Errors;
}

export const UserContext = createContext({} as UserContextValues);

export const UserProvider = ({ children }: IProviderProps) => {
  const navigate = useNavigate();
  const { data: profileData, error: profileError, request: profileRequest } = useRequest<UserProfile>();
  const { error: registerError, request: registerRequest, status: registerStatus } = useRequest<UserResponse>();
  const { error: updateError, request: updateRequest } = useRequest<UserResponse>();
  const { error: destroyError, request: destroyRequest } = useRequest();
  const [loginPayload, setLoginPayload] = useState<Pick<TUserData, 'email' | 'password'>>();
  const { request: login, status: loginStatus } = useRequest<{ token: string }>();

  useEffect(() => {
    if (registerStatus === HttpStatusCode.Created) login(() => axios.post(Endpoints.Login, loginPayload));
  }, [login, loginPayload, registerStatus]);

  useEffect(() => {
    if (loginStatus === HttpStatusCode.Ok) navigate(Pathnames.Homepage);
  }, [loginStatus, navigate]);

  const profile = useCallback(async () => await profileRequest(() => axios.get(Endpoints.Profile)), [profileRequest]);

  const register = useCallback(
    async (data: TUserData) => {
      await registerRequest(() => axios.post(Endpoints.User, data));
      setLoginPayload({ email: data.email, password: data.password });
    },
    [registerRequest],
  );

  const update = useCallback(
    async (body: TUserData) => await updateRequest(() => axios.patch(`${Endpoints.User}/${profileData?.id}`, body)),
    [profileData, updateRequest],
  );

  const destroy = useCallback(
    async () => await destroyRequest(() => axios.delete(`${Endpoints.User}/${profileData?.id}`)),
    [profileData, destroyRequest],
  );

  const userService: UserService = useMemo(
    () => ({ register, profile, update, destroy }),
    [register, profile, update, destroy],
  );
  const data: ReturnData = useMemo(() => ({ profile: profileData }), [profileData]);
  const errors: Errors = useMemo(
    () => ({ profileError, registerError, updateError, destroyError }),
    [profileError, registerError, updateError, destroyError],
  );

  const values = useMemo(() => ({ data, errors, userService }), [data, errors, userService]);

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

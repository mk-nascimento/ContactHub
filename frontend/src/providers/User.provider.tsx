import Cookies from 'js-cookie';
import { createContext, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Endpoints, Pathnames } from 'src/enums';
import { useRequest } from 'src/hooks/useRequest';
import { Contact } from 'src/interfaces';
import { TUserData } from 'src/schemas';
import axios from 'src/services/axios';

interface UserProviderProps {
  children: React.ReactNode;
}

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
  profile: () => Promise<void>;
  register: (data: TUserData) => Promise<void>;
  update: (updateData: TUserData) => Promise<void>;
  destroy: () => Promise<void>;
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

export const UserProvider = ({ children }: UserProviderProps) => {
  const navigate = useNavigate();

  const { data: profileData, error: profileError, request: profileRequest } = useRequest<UserProfile>();
  const { data: registerData, error: registerError, request: registerRequest } = useRequest<UserResponse>();
  const { error: updateError, request: updateRequest } = useRequest<UserResponse>();
  const { data: loginData, error: loginError, request: loginRequest } = useRequest<{ token: string }>();
  const { error: destroyError, request: destroyRequest } = useRequest();

  const profile = useCallback(async () => await profileRequest(() => axios.get('profile')), [profileRequest]);

  const register = useCallback(
    async (data: TUserData) => {
      await registerRequest(() => axios.post(Endpoints.User, data));

      if (registerData) {
        await loginRequest(() => axios.post(Endpoints.Login, data));

        if (loginData?.token) {
          Cookies.set('token', loginData.token, { secure: true });
          navigate(Pathnames.Homepage);
        }
      }
    },
    [loginData, loginRequest, navigate, registerData, registerRequest],
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
    () => ({ profileError, registerError, updateError, loginError, destroyError }),
    [profileError, registerError, updateError, loginError, destroyError],
  );

  const values = useMemo(() => ({ data, errors, userService }), [data, errors, userService]);

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

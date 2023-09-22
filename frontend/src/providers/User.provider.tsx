import Cookies from 'js-cookie';
import { createContext, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pathnames, endpoints } from '../enums';
import { useRequest } from '../hooks/useRequest';
import { Contact } from '../interfaces';
import { TUserData } from '../schemas';
import axios from '../services/axios';

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserResponse {
  id: string;
  full_name: string;
  email: string;
  created_at: Date;
  role: 'client' | 'admin';
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

interface UserContextValues {
  userService: UserService;
}

export const UserContext = createContext({} as UserContextValues);

export const UserProvider = ({ children }: UserProviderProps) => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile>();

  const { data: profileData, request: profileRequest } = useRequest<UserProfile>();
  const { data: registerData, request: registerRequest } = useRequest<UserResponse>();
  const { request: updateRequest } = useRequest<UserResponse>();
  const { data: loginData, request: loginRequest } = useRequest<{ token: string }>();
  const { request: destroyRequest } = useRequest();

  const profile = useCallback(async () => {
    await profileRequest(() => axios.get('profile'));

    if (profileData) setUserProfile(profileData);
  }, [profileData, profileRequest]);

  const register = useCallback(
    async (data: TUserData) => {
      await registerRequest(() => axios.post(endpoints.User, data));

      if (registerData) {
        await loginRequest(() => axios.post(endpoints.Login, data));

        if (loginData?.token) {
          Cookies.set('token', loginData.token, { secure: true });
          navigate(Pathnames.Homepage);
        }
      }
    },
    [loginData, loginRequest, navigate, registerData, registerRequest],
  );

  const update = useCallback(
    async (updateData: TUserData) => {
      await updateRequest(() => axios.patch(`${endpoints.User}/${userProfile?.id}`, updateData));
    },
    [userProfile, updateRequest],
  );

  const destroy = useCallback(async () => {
    await destroyRequest(() => axios.delete(`${endpoints.User}/${userProfile?.id}`));
  }, [userProfile, destroyRequest]);

  const userService: UserService = useMemo(
    () => ({ register, profile, update, destroy }),
    [register, profile, update, destroy],
  );

  const values = useMemo(() => ({ userService }), [userService]);

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

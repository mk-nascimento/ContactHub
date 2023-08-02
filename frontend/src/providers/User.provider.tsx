import { AxiosError } from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Contact } from '../interfaces/global.interfaces';
import { TUserData } from '../schemas';
import api from '../services/axios';

interface UserContextValues {
  getProfile: () => Promise<void>;
  registerUser: (data: TUserData) => Promise<void>;
  updateUser: (data: TUserData) => void;
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  role: 'client' | 'admin';
}

interface UserProfile extends UserResponse {
  contacts: Contact[];
}

export const UserContext = createContext({} as UserContextValues);

export const UserProvider = ({ children }: UserProviderProps) => {
  const navigate = useNavigate();
  const { pathname }: Partial<Location> = useLocation();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile>();
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

  const getProfile = async () => {
    try {
      const { data, status } = await api.get<UserProfile>('profile/');
      if (status === 200) setProfile((prev) => (prev !== data ? data : profile));
    } catch (error) {
      console.error(error);
    }
  };

  const registerUser = async (data: TUserData) => {
    try {
      const response = await api.post<UserResponse>('users/', data);
      const { id } = response.data;
      if (id) {
        const loginResponse = await api.post<{ token: string }>('login/', data);

        const { token } = loginResponse.data;

        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        localStorage.setItem('@fullstack-challenge:token', token);

        if (token) navigate('dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (updateData: TUserData) => {
    try {
      const { status } = await api.patch<UserResponse>(`users/${profile?.id}`, updateData);
      if (status === 200) setIsOpenModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const values = { getProfile, registerUser, updateUser, isOpenModal, setIsOpenModal };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

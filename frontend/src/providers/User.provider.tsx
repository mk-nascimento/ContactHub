import { AxiosError } from 'axios';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Contact } from '../interfaces/global.interfaces';
import { TUserData } from '../schemas';
import api from '../services/axios';

interface UserContextValues {
  getProfile: () => Promise<void>;
  registerUser: (data: TUserData) => Promise<void>;
  updateUser: (data: TUserData) => void;
  deleteUser: () => Promise<void>;
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  profile: UserProfile | undefined;
  exportProfile: (data: UserProfile) => void;
  deleteProfileModal: boolean;
  setDeleteProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
}

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

export const UserContext = createContext({} as UserContextValues);

export const UserProvider = ({ children }: UserProviderProps) => {
  const navigate = useNavigate();
  const { pathname }: Partial<Location> = useLocation();
  const [deleteProfileModal, setDeleteProfileModal] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile>();
  const token: string | null = localStorage.getItem('@fullstack-challenge:token');

  useEffect(() => {
    if (!token) navigate('/');
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const validate = async () => {
      try {
        await api.get('auth/validate/');
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401 && pathname !== '/') navigate('/');
      }
    };
    if (api.defaults.headers.common.Authorization) validate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const getProfile = async () => {
    try {
      const { data, status } = await api.get<UserProfile>('profile/');
      if (status === 200) setProfile((prev) => (prev !== data ? data : profile));
    } catch (error) {
      if (error instanceof AxiosError) navigate('/dashboard');
    }
  };

  const registerUser = async (data: TUserData) => {
    try {
      const response = await api.post<UserResponse>('users/', data);
      const { id } = response.data;
      if (id) {
        const loginResponse = await api.post<{ token: string }>('auth/login/', data);

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

  const deleteUser = async () => {
    try {
      await api.delete(`users/${profile?.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const exportProfile = (data: UserProfile) => {
    const def: TDocumentDefinitions = {
      content: [
        { text: 'Informações de usuário', style: 'header' },
        { text: `ID: ${data.id}` },
        { text: `Name: ${data.full_name}` },
        { text: `Email: ${data.email}` },
        { text: `Created At: ${data.created_at}` },
        { text: 'Contatos', style: 'subheader' },
        data.contacts?.map((contact) => [
          { text: `ID: ${contact.id}` },
          { text: `Full Name: ${contact.full_name}` },
          { text: `Email: ${contact.email}` },
          { text: `Cellphone: ${contact.cellphone}` },
          { text: `Created At: ${contact.created_at}` },
          { text: '' },
        ]),
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 5],
        },
      },
    };
    pdfMake.createPdf(def).download('export_profile.pdf');
  };

  const values = {
    getProfile,
    registerUser,
    updateUser,
    deleteUser,
    isOpenModal,
    setIsOpenModal,
    profile,
    exportProfile,
    deleteProfileModal,
    setDeleteProfileModal,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

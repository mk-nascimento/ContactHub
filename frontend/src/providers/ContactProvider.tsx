import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contact, ContactData } from '../interfaces/global.interfaces';
import { TContactPayload } from '../schemas';
import api from '../services/axios';

interface ContactContextValues {
  contacts: Contact[];
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedContact: ContactData;
  setSelectedContact: React.Dispatch<React.SetStateAction<ContactData>>;
  updateContact: (data: TContactPayload) => Promise<void>;
}

export interface ContactsProviderChildren {
  children: React.ReactNode;
}

export const ContactContext = createContext({} as ContactContextValues);

export const ContactsProvider = ({ children }: ContactsProviderChildren) => {
  const [selectedContact, setSelectedContact] = useState<ContactData>({} as ContactData);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const navigate = useNavigate();
  const token: string | null = localStorage.getItem('@fullstack-challenge:token');

  useEffect(() => {
    (async () => {
      if (!token) navigate('/');

      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const response = await api.get<Contact[]>('contacts/');
      setContacts(response.data);
    })();
  }, [navigate, token]);

  const updateContact = async (contactDataPayload: TContactPayload): Promise<void> => {
    try {
      const { data, status } = await api.patch<Contact>(`contacts/${selectedContact.id}`, contactDataPayload);
      if (status === 200) {
        setIsOpenModal(false);
        setContacts((prev) => prev.map((cont) => (cont.id === data.id ? data : cont)));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const values = { contacts, isOpenModal, setIsOpenModal, selectedContact, setSelectedContact, updateContact };
  return <ContactContext.Provider value={values}>{children}</ContactContext.Provider>;
};

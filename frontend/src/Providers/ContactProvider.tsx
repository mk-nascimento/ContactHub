import { createContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
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
  useEffect(() => {
    (async () => {
      const token: string | null = localStorage.getItem('@fullstack-challenge:token');

      if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const response = await api.get<Contact[]>('contacts/');
        setContacts(response.data);
      }
      <Navigate to="/" />;
    })();
  }, []);

  const updateContact = async (contactDataPayload: TContactPayload): Promise<void> => {
    try {
      const { data } = await api.patch<Contact>(`contacts/${selectedContact.id}`, contactDataPayload);
      if (data.id) {
        contacts.map((cont) => {
          if (cont.id === data.id) return data;
          return cont;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const values = { contacts, isOpenModal, setIsOpenModal, selectedContact, setSelectedContact, updateContact };
  return <ContactContext.Provider value={values}>{children}</ContactContext.Provider>;
};

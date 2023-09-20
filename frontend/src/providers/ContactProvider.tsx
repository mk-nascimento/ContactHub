import { createContext, useState } from 'react';
import mockedData from '../../.mock';
import { Contact, ContactData } from '../interfaces/global.interfaces';
import { TContactPayload } from '../schemas';
import api from '../services/axios';

interface ContactContextValues {
  contacts: Contact[];
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteContactModal: boolean;
  setDeleteContactModal: React.Dispatch<React.SetStateAction<boolean>>;
  addContactModal: boolean;
  setAddContactModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedContact: ContactData;
  setSelectedContact: React.Dispatch<React.SetStateAction<ContactData>>;
  addContact: (contactDataPayload: TContactPayload) => Promise<void>;
  updateContact: (data: TContactPayload) => Promise<void>;
  deleteContact: () => Promise<void>;
}

export interface ContactsProviderChildren {
  children: React.ReactNode;
}

export const ContactContext = createContext({} as ContactContextValues);

export const ContactsProvider = ({ children }: ContactsProviderChildren) => {
  const [contacts, setContacts] = useState<Contact[]>(mockedData.contacts);
  const [addContactModal, setAddContactModal] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [deleteContactModal, setDeleteContactModal] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<ContactData>(
    {} as ContactData
  );
  // const navigate = useNavigate();
  // const token: string | null = localStorage.getItem(
  //   '@fullstack-challenge:token'
  // );

  // useEffect(() => {
  //   (async () => {
  //     api.defaults.headers.common.Authorization = `Bearer ${token}`;
  //     const response = await api.get<Contact[]>('contacts/');
  //     setContacts(response.data);
  //   })();
  // }, [navigate, token]);

  const addContact = async (
    contactDataPayload: TContactPayload
  ): Promise<void> => {
    try {
      const { data, status } = await api.post<Contact>(
        `contacts/`,
        contactDataPayload
      );
      if (status === 201) {
        setAddContactModal(false);
        setContacts([...contacts, data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateContact = async (
    contactDataPayload: TContactPayload
  ): Promise<void> => {
    try {
      const { data, status } = await api.patch<Contact>(
        `contacts/${selectedContact.id}`,
        contactDataPayload
      );
      if (status === 200) {
        setIsOpenModal(false);
        setContacts((prev) =>
          prev.map((cont) => (cont.id === data.id ? data : cont))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteContact = async (): Promise<void> => {
    try {
      const { status } = await api.delete(`contacts/${selectedContact.id}`);
      if (status === 204) {
        setDeleteContactModal(false);
        setContacts((prev) =>
          prev.filter((cont) => cont.id !== selectedContact.id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const values = {
    contacts,
    isOpenModal,
    setIsOpenModal,
    selectedContact,
    setSelectedContact,
    addContact,
    updateContact,
    deleteContact,
    deleteContactModal,
    setDeleteContactModal,
    addContactModal,
    setAddContactModal,
  };
  return (
    <ContactContext.Provider value={values}>{children}</ContactContext.Provider>
  );
};

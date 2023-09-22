import { HttpStatusCode } from 'axios';
import Cookies from 'js-cookie';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import mockedData from '../../.mock';
import { endpoints } from '../enums';
import { useRequest } from '../hooks/useRequest';
import { Contact } from '../interfaces';
import { TContactPayload } from '../schemas';
import axios from '../services/axios';

export interface ContactsProviderChildren {
  children: React.ReactNode;
}

interface ContactService {
  create(data: TContactPayload): Promise<void>;
  read(): Promise<void>;
  update(data: TContactPayload, id: string): Promise<void>;
  destroy(id: string): Promise<void>;
}

interface ContactContextValues {}

export const ContactContext = createContext({} as ContactContextValues);

export const ContactsProvider = ({ children }: ContactsProviderChildren) => {
  const token = Cookies.get('token');

  const { data: newContact, request: createRequest } = useRequest<Contact>();
  const { data: contactInstance, request: updateRequest } = useRequest<Contact>();
  const { data: contactsList, request: readRequest, status: readStatus } = useRequest<Contact[]>();
  const { request: destroyRequest, status: destroyStatus } = useRequest();

  const [contacts, setContacts] = useState<Contact[]>(mockedData.contacts ?? contactsList);
  axios.defaults.headers.common.Authorization = `Bearer ${token ?? mockedData.token}`;

  const create = useCallback(
    async (contactDataPayload: TContactPayload) => {
      await createRequest(() => axios.post(endpoints.Contact, contactDataPayload));

      if (newContact) setContacts([...contacts, newContact]);
    },
    [contacts, createRequest, newContact],
  );

  const read = useCallback(async () => {
    await readRequest(() => axios.get(endpoints.Contact));

    if (readStatus === HttpStatusCode.Ok) setContacts(contactsList as Contact[]);
  }, [contactsList, readRequest, readStatus]);

  const update = useCallback(
    async (contactDataPayload: TContactPayload, id: string) => {
      await updateRequest(() => axios.patch(`${endpoints.Contact}/${id}}`, contactDataPayload));

      if (contactInstance) setContacts((prev) => [...prev.filter((cont) => cont.id !== id), contactInstance]);
    },
    [contactInstance, updateRequest],
  );

  const destroy = useCallback(
    async (id: string) => {
      await destroyRequest(() => axios.delete(`${endpoints.Contact}/${id}`));

      if (destroyStatus === HttpStatusCode.NoContent) setContacts((prev) => prev.filter((cont) => cont.id !== id));
    },
    [destroyRequest, destroyStatus],
  );

  const contactService: ContactService = useMemo(() => ({ create, read, update, destroy }), [create, read, update, destroy]);

  useEffect(() => {
    const loadData = async () => {
      await contactService.read();
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = useMemo(() => ({ contactService }), [contactService]);

  return <ContactContext.Provider value={values}>{children}</ContactContext.Provider>;
};

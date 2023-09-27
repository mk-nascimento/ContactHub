import { HttpStatusCode } from 'axios';
import { createContext, useCallback, useEffect, useMemo } from 'react';
import { Endpoints } from '../enums';
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

interface ReturnData {
  contactList: Contact[];
}

interface Status {
  [key: string]: HttpStatusCode | undefined;
}

interface ContactContextValues {
  contactService: ContactService;
  data: ReturnData;
  responseStatus: Status;
}

export const ContactContext = createContext({} as ContactContextValues);

export const ContactsProvider = ({ children }: ContactsProviderChildren) => {
  const { request: createRequest, status: createStatus } = useRequest<Contact>();
  const { request: updateRequest, status: updateStatus } = useRequest<Contact>();
  const { data: contactList, request: readRequest } = useRequest<Contact[]>();
  const { request: destroyRequest, status: destroyStatus } = useRequest();

  const create = useCallback(
    async (contactDataPayload: TContactPayload) => {
      await createRequest(() => axios.post(Endpoints.Contact, contactDataPayload));

      if (createStatus === HttpStatusCode.Created) await readRequest(() => axios.get(Endpoints.Contact));
    },
    [createRequest, createStatus, readRequest],
  );

  const read = useCallback(async () => await readRequest(() => axios.get(Endpoints.Contact)), [readRequest]);

  const update = useCallback(
    async (contactDataPayload: TContactPayload, id: string) => {
      await updateRequest(() => axios.patch(`${Endpoints.Contact}/${id}}`, contactDataPayload));

      if (updateStatus === HttpStatusCode.Created) await readRequest(() => axios.get(Endpoints.Contact));
    },
    [readRequest, updateRequest, updateStatus],
  );

  const destroy = useCallback(
    async (id: string) => {
      await destroyRequest(() => axios.delete(`${Endpoints.Contact}/${id}`));

      if (destroyStatus === HttpStatusCode.NoContent) await readRequest(() => axios.get(Endpoints.Contact));
    },
    [destroyRequest, destroyStatus, readRequest],
  );

  const contactService: ContactService = useMemo(() => ({ create, read, update, destroy }), [create, read, update, destroy]);
  const data: ReturnData = useMemo(() => ({ contactList: contactList ?? [] }), [contactList]);
  const responseStatus: Status = useMemo(
    () => ({ createStatus, updateStatus, destroyStatus }),
    [createStatus, updateStatus, destroyStatus],
  );

  useEffect(() => {
    const loadData = async () => {
      await contactService.read();
    };

    loadData();
  }, [contactService]);

  const values = useMemo(() => ({ contactService, data, responseStatus }), [contactService, data, responseStatus]);

  return <ContactContext.Provider value={values}>{children}</ContactContext.Provider>;
};

import { HttpStatusCode } from 'axios';
import { createContext, useCallback, useEffect, useMemo } from 'react';
import { Endpoints } from 'src/enums';
import { useRequest } from 'src/hooks/useRequest';
import { Contact } from 'src/interfaces';
import { TContactPayload } from 'src/schemas';
import axios from 'src/services/axios';
import { IProviderProps } from './interface.provider.global';

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

export const ContactsProvider = ({ children }: IProviderProps) => {
  const { request: createRequest, status: createStatus } = useRequest<Contact>();
  const { request: updateRequest, status: updateStatus } = useRequest<Contact>();
  const { data: contactList, request: readRequest } = useRequest<Contact[]>();
  const { request: destroyRequest, status: destroyStatus } = useRequest();

  const create = useCallback(
    async (contactDataPayload: TContactPayload) => await createRequest(() => axios.post(Endpoints.Contact, contactDataPayload)),
    [createRequest],
  );

  const read = useCallback(async () => await readRequest(() => axios.get(Endpoints.Contact)), [readRequest]);

  const update = useCallback(
    async (contactDataPayload: TContactPayload, id: string) =>
      await updateRequest(() => axios.patch(`${Endpoints.Contact}/${id}}`, contactDataPayload)),
    [updateRequest],
  );

  const destroy = useCallback(
    async (id: string) => await destroyRequest(() => axios.delete(`${Endpoints.Contact}/${id}`)),
    [destroyRequest],
  );

  useEffect(() => {
    if (createStatus || updateStatus || destroyStatus) (async () => await read())();
  }, [createStatus, destroyStatus, updateStatus, read]);

  const contactService: ContactService = useMemo(() => ({ create, read, update, destroy }), [create, read, update, destroy]);
  const data: ReturnData = useMemo(() => ({ contactList: contactList ?? [] }), [contactList]);
  const responseStatus: Status = useMemo(
    () => ({ createStatus, updateStatus, destroyStatus }),
    [createStatus, updateStatus, destroyStatus],
  );

  const values = useMemo(() => ({ contactService, data, responseStatus }), [contactService, data, responseStatus]);

  return <ContactContext.Provider value={values}>{children}</ContactContext.Provider>;
};

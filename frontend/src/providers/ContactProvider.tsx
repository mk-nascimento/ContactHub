import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Endpoints } from 'src/enums';
import { useRequest } from 'src/hooks/useRequest';
import { IContact } from 'src/interfaces';
import { TContactPayload } from 'src/schemas';
import { IProviderProps } from './interface.provider.global';

interface IContactService {
  create(data: TContactPayload): Promise<void>;
  read(): Promise<void>;
  update(data: TContactPayload, id: string): Promise<void>;
  destroy(id: string): Promise<void>;
}

interface IContactContextValues {
  contactService: IContactService;
  contacts: IContact[];
}

export const ContactContext = createContext({} as IContactContextValues);

export const ContactsProvider = ({ children }: IProviderProps) => {
  const { request: createContact, response: crResponse } = useRequest<IContact, TContactPayload>();
  const { request: updateContact, response: updResponse } = useRequest<IContact, Partial<TContactPayload>>();
  const { request: retrieveAll, response: retResponse } = useRequest<IContact[]>(true);
  const { data: contacts } = retResponse;
  const { request: destroyContact, response: delResponse } = useRequest();
  const [status] = useState(crResponse.status ?? updResponse.status ?? delResponse.status);

  const create = useCallback(
    async (data: TContactPayload) => await createContact({ method: 'POST', url: Endpoints.Contact, data }),
    [createContact],
  );

  const read = useCallback(async () => await retrieveAll({ url: Endpoints.Contact }), [retrieveAll]);

  const update = useCallback(
    async (data: Partial<TContactPayload>, id: string) =>
      await updateContact({ method: 'PATCH', url: `${Endpoints.Contact}/${id}}`, data }),
    [updateContact],
  );

  const destroy = useCallback(
    async (id: string) => await destroyContact({ method: 'DELETE', url: `${Endpoints.Contact}/${id}` }),
    [destroyContact],
  );

  useEffect(() => {
    if (status) (async () => await read())();
  }, [status, read]);

  const contactService: IContactService = useMemo(() => ({ create, read, update, destroy }), [create, read, update, destroy]);

  const values: IContactContextValues = useMemo(
    () => ({ contacts: contacts ?? [], contactService }),
    [contacts, contactService],
  );
  return <ContactContext.Provider value={values}>{children}</ContactContext.Provider>;
};

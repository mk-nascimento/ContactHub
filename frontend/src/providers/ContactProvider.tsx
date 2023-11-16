import { createContext, useCallback, useMemo, useState } from 'react';
import { Endpoints } from 'src/enums';
import { useRequest } from 'src/hooks/useRequest';
import { IContact } from 'src/interfaces';
import { TContactPayload } from 'src/schemas';
import { IProviderProps } from './interface.provider.global';

interface IContactService {
  create(data: TContactPayload): Promise<void>;
  read(): Promise<void>;
  update(data: TContactPayload): Promise<void>;
  destroy(): Promise<void>;
}

interface IContactContextValues {
  contactService: IContactService;
  contacts: IContact[];
  createModalStates: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  highlightedStates: [IContact | undefined, React.Dispatch<React.SetStateAction<IContact | undefined>>];
}

export const ContactContext = createContext({} as IContactContextValues);

export const ContactsProvider = ({ children }: IProviderProps) => {
  const [highlightedContact, setHighlightedContact] = useState<IContact>();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { request: createContact } = useRequest<IContact, TContactPayload>();
  const { request: retrieveAll, response: retResponse } = useRequest<IContact[]>(true);
  const { request: updateContact } = useRequest<IContact, Partial<TContactPayload>>();
  const { request: destroyContact } = useRequest();
  const { data: contacts } = retResponse;

  const read = useCallback(async () => await retrieveAll({ url: Endpoints.Contact }), [retrieveAll]);

  const create = useCallback(
    async (data: TContactPayload) => await createContact({ method: 'POST', url: Endpoints.Contact, data }).then(read),
    [createContact, read],
  );

  const update = useCallback(
    async (data: Partial<TContactPayload>) =>
      await updateContact({ method: 'PATCH', url: `${Endpoints.Contact}/${highlightedContact?.id}`, data }).then(read),
    [read, updateContact, highlightedContact],
  );

  const destroy = useCallback(
    async () => await destroyContact({ method: 'DELETE', url: `${Endpoints.Contact}/${highlightedContact?.id}` }).then(read),
    [destroyContact, read, highlightedContact],
  );

  const contactService: IContactService = useMemo(() => ({ create, read, update, destroy }), [create, read, update, destroy]);

  const values: IContactContextValues = useMemo(
    () => ({
      createModalStates: [openCreateModal, setOpenCreateModal],
      contacts: contacts ?? [],
      contactService,
      highlightedStates: [highlightedContact, setHighlightedContact],
    }),
    [contacts, contactService, highlightedContact, openCreateModal],
  );
  return <ContactContext.Provider value={values}>{children}</ContactContext.Provider>;
};

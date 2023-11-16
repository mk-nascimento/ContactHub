import { HTMLAttributes, useEffect } from 'react';
import { BsPersonPlus } from 'react-icons/bs';
import { useContact } from 'src/hooks/useContact';
import { ContactItem } from './ContactItem';

interface Props extends HTMLAttributes<HTMLUListElement> {
  view?: boolean;
}

export const ContactList = ({ view, ...props }: Props) => {
  const { createModalStates, contacts, contactService, highlightedStates } = useContact();
  const { '1': setCreateModal } = createModalStates;
  const { '1': setHighlightedContact } = highlightedStates;
  const { read } = contactService;

  useEffect(() => {
    (async () => await read())();
  }, [read]);

  return (
    <div className='tw-authenticated-main-child contact-list-container flex flex-1 flex-col overflow-hidden'>
      <div className='flex flex-col gap-[12px] px-[16px]'>
        <button
          disabled={view}
          className={`contact-list-container__new-contact ${
            view
              ? 'border-transparent text-transparent opacity-0'
              : 'border-brand-300 text-brand-300 hover:bg-brand-300 hover:text-grey-50 focus:border-brand-100 focus:bg-brand-100 focus:text-brand-300'
          } self-end rounded-[8px] border p-[8px] text-center`
            .trim()
            .replace(/\s+/g, ' ')}
          onClick={() => setCreateModal(true)}
        >
          <BsPersonPlus />
        </button>

        <div className='contact-list-container__header text-12-700 grid-flow- grid grid-cols-2 gap-x-[8px] border-b border-grey-700 px-[16px] capitalize sm:grid-cols-3 md:grid-cols-4'>
          <h4 className='truncate'>nome</h4>
          <h4 className='hidden truncate sm:block'>telefone</h4>
          <h4 className='truncate'>email</h4>
          <h4 className='hidden truncate md:block'>cadastrado em</h4>
        </div>
      </div>

      <ul {...props} className='flex flex-col gap-[16px] overflow-y-auto pb-[8px] md:gap-[24px]'>
        {contacts.length ? (
          contacts.map((cont) => (
            <ContactItem
              contact={cont}
              key={cont.id}
              view={view}
              onClick={view ? undefined : () => setHighlightedContact(cont)}
            />
          ))
        ) : (
          <li className='text-14-400 rounded-[6px] px-[16px] text-center'>Você ainda não possui contatos cadastrados...</li>
        )}
      </ul>
    </div>
  );
};

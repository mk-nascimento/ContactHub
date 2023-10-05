import { HTMLAttributes, useEffect } from 'react';
import { BsPersonPlus } from 'react-icons/bs';
import { useContact } from 'src/hooks/useContact';
import { ContactCard } from './Contact';

interface Props extends HTMLAttributes<HTMLUListElement> {}

export const ContactList = (props: Props) => {
  const {
    data: { contactList },
    contactService: { read },
  } = useContact();

  useEffect(() => {
    (async () => await read())();
  }, [read]);

  return (
    <div className='contact-list-container flex h-full w-full flex-col gap-[32px] rounded-[16px] bg-grey-100 p-[16px] shadow-lg shadow-brand-100'>
      <div className='flex flex-col gap-[12px] px-[16px]'>
        <button className='contact-list-container__new-contact self-end rounded-[8px] border border-brand-300 p-[8px] text-center text-brand-300 hover:bg-brand-300 hover:text-grey-50 focus:border-brand-100 focus:bg-brand-100 focus:text-brand-300'>
          <BsPersonPlus />
        </button>
        <div className='contact-list-container__header text-12-700 grid-flow- grid grid-cols-2 gap-x-[8px] border-b border-grey-700 px-[16px] capitalize sm:grid-cols-3 md:grid-cols-4'>
          <h4 className='truncate'>nome</h4>
          <h4 className='hidden truncate sm:block'>telefone</h4>
          <h4 className='truncate'>email</h4>
          <h4 className='hidden truncate md:block'>cadastrado em</h4>
        </div>
      </div>
      <ul {...props} className='flex flex-col gap-[16px] md:gap-[24px]'>
        {contactList.map((cont) => (
          <ContactCard contact={cont} key={cont.id} />
        ))}
      </ul>
    </div>
  );
};

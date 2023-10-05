import { LiHTMLAttributes } from 'react';
import { Contact } from 'src/interfaces';
import { phoneReplaceRegex } from 'utils/string.utils';

interface Props extends LiHTMLAttributes<HTMLLIElement> {
  contact: Contact;
}

export const ContactCard = ({ contact, ...rest }: Props) => (
  <li
    {...rest}
    className='text-14-400 grid h-8 grid-cols-2 items-center gap-x-[8px] rounded-[6px] px-[16px] capitalize first:pl-[16px] last:pr-[16px] hover:scale-[1.01] hover:shadow-sm hover:shadow-brand-300 sm:grid-cols-3 md:grid-cols-4'
  >
    <p className='cursor-pointer truncate pl-[16px]'>{contact.full_name ?? 'full name'}</p>
    <p className='hidden cursor-pointer truncate sm:block'>
      {contact.phone.replace(...phoneReplaceRegex) ?? '(**) *****-****'}
    </p>
    <p className='cursor-pointer truncate pr-[16px] lowercase md:pr-0'>{contact.email ?? 'mail@mail.com'}</p>
    <p className='hidden cursor-pointer truncate pr-[16px] md:block'>
      {new Date(contact.created_at).toLocaleDateString('pt-BR') ?? '01/01/1999'}
    </p>
  </li>
);

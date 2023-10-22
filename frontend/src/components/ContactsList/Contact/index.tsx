import { LiHTMLAttributes } from 'react';
import { Contact } from 'src/interfaces';
import { phoneReplaceRegex } from 'utils/string.utils';

interface Props extends LiHTMLAttributes<HTMLLIElement> {
  contact: Contact;
  view?: boolean;
}

export const ContactCard = ({ contact, view, ...rest }: Props) => (
  <li
    {...rest}
    className={`text-14-400 grid h-8 grid-cols-2 items-center rounded-[6px] px-[16px] capitalize sm:grid-cols-3 md:grid-cols-4 ${
      !view ? 'cursor-pointer hover:scale-[1.01] hover:shadow-sm hover:shadow-brand-300' : 'cursor-not-allowed select-none'
    }`.trim()}
  >
    <p className='truncate pl-[16px] pr-[8px]'>{contact.full_name ?? 'full name'}</p>
    <p className='hidden truncate pr-[8px] sm:block'>{contact.phone.replace(...phoneReplaceRegex) ?? '(**) *****-****'}</p>
    <p className='truncate pr-[16px] lowercase md:pr-[8px]'>{contact.email ?? 'mail@mail.com'}</p>
    <p className='hidden truncate pr-[16px] md:block'>
      {new Date(contact.created_at).toLocaleDateString('pt-BR') ?? '01/01/1999'}
    </p>
  </li>
);

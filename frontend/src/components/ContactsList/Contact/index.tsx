import { LiHTMLAttributes } from 'react';
import { IContact } from 'src/interfaces';
import { phoneReplaceRegex } from 'utils/string.utils';

interface Props extends LiHTMLAttributes<HTMLLIElement> {
  contact: IContact;
  view?: boolean;
}

export const ContactCard = ({ contact, view, ...rest }: Props) => (
  <li
    {...rest}
    className={`text-14-400 grid h-8 grid-cols-2 items-center rounded-[6px] px-[16px] capitalize sm:grid-cols-3 md:grid-cols-4 ${
      !view ? 'group cursor-pointer border-brand-300 hover:border-b' : 'cursor-not-allowed select-none'
    }`.trim()}
  >
    <p className='truncate pl-[16px] pr-[8px] group-hover:underline'>{contact.full_name}</p>
    <p className='hidden truncate pr-[8px] group-hover:underline sm:block'>{contact.phone.replace(...phoneReplaceRegex)}</p>
    <p className='truncate pr-[16px] lowercase group-hover:underline md:pr-[8px]'>{contact.email}</p>
    <p className='hidden truncate pr-[16px] group-hover:underline md:block'>
      {new Date(contact.created_at).toLocaleDateString('pt-BR')}
    </p>
  </li>
);

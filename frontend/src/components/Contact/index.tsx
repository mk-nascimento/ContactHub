import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useContact } from '../../hooks/useContact';
import { Contact } from '../../interfaces/global.interfaces';

interface Props {
  contact: Contact;
  viewMode?: boolean;
}

export const ContactCard = ({ contact, viewMode }: Props) => {
  const { setSelectedContact, setIsOpenModal: setModal } = useContact();

  const onEditContactClick = () => (setSelectedContact(contact), setModal(true));
  const truncatedName = (maxChar: number) =>
    contact?.full_name && contact.full_name.length > maxChar ? `${contact.full_name.slice(0, maxChar)}...` : contact?.full_name;

  const fieldNameClass: string = 'm-0 font-semibold text-lg break-all';
  const valueClass: string = 'font-medium text-base';
  const btnFuncClass: string = 'w-fit p-2 rounded-md cursor-pointer transition-colors duration-500 hover:scale-1 hover:bg-pink-500';

  return (
    <li className={`w-full border-gray-700 border-[2px] rounded p-2 cursor-pointer`}>
      <div id="contact" className="flex max-md:flex-col gap-y-4 md:justify-between md:items-center">
        <div id="contact-info" className="grid gap-2">
          <p className={fieldNameClass}>
            Nome:{' '}
            <span className={valueClass} title={contact.full_name}>
              {truncatedName(15)}
            </span>
          </p>
          <p className={fieldNameClass}>
            Telefone: <span className={valueClass}>{contact.cellphone}</span>
          </p>
          <p className={fieldNameClass}>
            Email: <span className={valueClass}>{contact.email}</span>
          </p>
        </div>
        {!viewMode ? (
          <div id="contact-options" className="flex gap-4 justify-center md:w-fit md:ml-auto md:flex-col">
            <button className={btnFuncClass} onClick={onEditContactClick}>
              <FaEdit />
            </button>
            <button className={btnFuncClass} onClick={() => console.log('contato deletar')}>
              <FaTrashAlt />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </li>
  );
};

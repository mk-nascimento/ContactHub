import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useContact } from '../../hooks/useContact';
import { Contact } from '../../interfaces/global.interfaces';

interface Props {
  contact: Contact;
  viewMode?: boolean;
}

export const ContactCard = ({ contact, viewMode }: Props) => {
  const { setSelectedContact, setIsOpenModal: setModal, setDeleteContactModal } = useContact();

  const onEditContactClick = () => (setSelectedContact(contact), setModal(true));
  const onDeleteContactClick = () => (setSelectedContact(contact), setDeleteContactModal(true));

  const fieldNameClass: string = 'm-0 font-semibold text-lg break-all';
  const valueClass: string = 'font-medium text-base';

  return (
    <li className={`w-full border-gray-700 border-[2px] rounded p-2 cursor-pointer`}>
      <div id="contact" className="flex max-md:flex-col gap-y-4 md:justify-between md:items-center">
        <div id="contact-info" className="grid gap-2">
          <p className={fieldNameClass}>
            Nome:{' '}
            <span className={valueClass} title={contact.full_name}>
              {contact.full_name}
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
            <button className="icon-button" onClick={onEditContactClick}>
              <FaEdit />
            </button>
            <button className="icon-button" onClick={onDeleteContactClick}>
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

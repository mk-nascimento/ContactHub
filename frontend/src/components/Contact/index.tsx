import { useContact } from '../../hooks/useContact';
import { Contact } from '../../interfaces/global.interfaces';

interface Props {
  contact: Contact;
}

export const ContactCard = ({ contact }: Props) => {
  const { setSelectedContact, setIsOpenModal: setModal } = useContact();

  const onContactClick = () => (setSelectedContact(contact), setModal(true));

  return (
    <li
      onClick={onContactClick}
      className="flex md:flex-row flex-col md:justify-between md:items-center items-start border-gray-700 border-[2px] rounded-[4px] px-[4px] py-[6px] transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
    >
      <p className="m-0">
        nome: <span>{contact.full_name}</span>
      </p>
      <p className="m-0">
        celular: <span>{contact.cellphone}</span>
      </p>
    </li>
  );
};

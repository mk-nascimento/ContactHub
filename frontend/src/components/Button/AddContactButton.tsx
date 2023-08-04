import { IoPersonAdd } from 'react-icons/io5';

import { useContact } from '../../hooks/useContact';

export const AddContactButton = () => {
  const { setAddContactModal } = useContact();

  return (
    <button id="add-contact-button" className="icon-button absolute top-4 right-5 text-xl animate-pulse" onClick={() => setAddContactModal(true)}>
      <IoPersonAdd />
    </button>
  );
};

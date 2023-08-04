import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

import { useContact } from '../../hooks/useContact';
import { useUser } from '../../hooks/useUser';

interface Props {
  children?: React.ReactNode;
}

export const CustomModal = ({ children }: Props) => {
  const {
    isOpenModal: editContact,
    setIsOpenModal: setEditContact,
    deleteContactModal,
    setDeleteContactModal,
    addContactModal,
    setAddContactModal,
  } = useContact();
  const { isOpenModal: editProfile, setIsOpenModal: setEditProfile, deleteProfileModal, setDeleteProfileModal } = useUser();

  const ref = useRef<HTMLDivElement>(null);
  const open: boolean = addContactModal || deleteProfileModal || deleteContactModal || editContact || editProfile;

  const closeModal = () => (
    setAddContactModal(false), setDeleteProfileModal(false), setDeleteContactModal(false), setEditContact(false), setEditProfile(false)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current || !event.target) return;

      if (!(event.target instanceof Node) || !ref.current.contains(event.target)) closeModal();
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-80 bg-gray-900 transition-opacity">
          <div ref={ref} className="relative p-0 rounded-lg shadow-lg animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-xl text-gray-50 hover:text-pink-500 transition-colors duration-500 animate-pulse"
            >
              <IoClose />
            </button>
            {children}
          </div>
        </div>
      )}
    </>,
    document.body,
  );
};

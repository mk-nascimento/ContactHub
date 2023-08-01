import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

import { useContact } from '../../hooks/useContact';

interface Props {
  children?: React.ReactNode;
}

export const CustomModal = ({ children }: Props) => {
  const { isOpenModal: openContact, setIsOpenModal: setOpenContact } = useContact();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current || !event.target) return;

      if (!(event.target instanceof Node) || !ref.current.contains(event.target)) setOpenContact(false);
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpenContact]);

  return createPortal(
    <>
      {openContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-900 transition-opacity">
          <div
            ref={ref}
            className="modal-content p-0 rounded-lg shadow-lg animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              onClick={() => setOpenContact(false)}
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

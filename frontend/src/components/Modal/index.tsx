import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

interface IModalProps {
  children?: React.ReactNode;
  statePair: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
export const Modal = ({ children, statePair }: IModalProps) => {
  const [open, setOpen] = statePair;
  const dialog = useRef<HTMLDialogElement>(null);
  const div = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setOpen(false);
    dialog.current?.close();
  };

  useEffect(() => {
    const handleOutClick = (event: MouseEvent) => {
      if (!div.current || !event.target) return;
      if (!(event.target instanceof Node) || !div.current.contains(event.target)) closeModal();
    };
    if (dialog) window.addEventListener('mousedown', handleOutClick);

    return () => window.removeEventListener('mousedown', handleOutClick);
  });

  useEffect(() => {
    if (open && dialog.current) dialog.current.showModal();
  }, [open]);

  return createPortal(
    <>
      {open && (
        <dialog
          ref={dialog}
          className='w-11/12 max-w-sm rounded-[8px] border-none outline-none backdrop:bg-brand-neutral backdrop:bg-opacity-75 lg:max-w-md'
        >
          <div ref={div} className='relative w-full rounded-[8px] bg-grey-100 p-[32px] shadow-lg shadow-brand-100'>
            <button
              onClick={closeModal}
              className='absolute right-4 top-4 animate-pulse text-xl text-brand-100 transition-colors duration-500 hover:animate-none hover:text-brand-300'
            >
              <IoClose />
            </button>
            {children}
          </div>
        </dialog>
      )}
    </>,
    document.body,
  );
};

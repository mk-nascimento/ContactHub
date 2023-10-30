import { HTMLAttributes, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

interface IModalProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  statePair: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
export const Modal = ({ className, statePair, children, ...rest }: IModalProps) => {
  const [open, setOpen] = statePair;
  const ref = useRef<HTMLDivElement>(null);

  const closeModal = () => setOpen(false);

  useEffect(() => {
    const handleOutClick = (event: MouseEvent) => {
      if (!ref.current || !event.target) return;
      if (!(event.target instanceof Node) || !ref.current.contains(event.target)) closeModal();
    };
    window.addEventListener('mousedown', handleOutClick);
    return () => window.removeEventListener('mousedown', handleOutClick);
  });

  return createPortal(
    <>
      {open && (
        <div className='fixed inset-0 z-50 flex transform items-center justify-center bg-grey-100 bg-opacity-75 transition-opacity ease-in-out'>
          <div
            className={`${className} relative h-fit w-fit bg-grey-100 p-0 shadow-lg shadow-brand-100`.trim()}
            {...rest}
            ref={ref}
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-title'
          >
            <button
              onClick={closeModal}
              className='absolute right-4 top-4 animate-pulse text-xl text-grey-50 transition-colors duration-500 hover:text-brand-100'
            >
              <IoClose />
              {children}
            </button>
          </div>
        </div>
      )}
    </>,
    document.body,
  );
};

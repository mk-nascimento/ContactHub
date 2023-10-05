import { useState } from 'react';
import { BsGrid1X2Fill, BsPersonFillGear, BsPersonFillX, BsPersonLinesFill } from 'react-icons/bs';
import { IoLogOutSharp } from 'react-icons/io5';
import { Navbar } from 'src/components/Navbar';
import { useAuth } from 'src/hooks/useAuth';

interface MainContainerProps {
  children?: React.ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const {
    authenticator: { logout },
  } = useAuth();
  return (
    <>
      <Navbar setter={setShowSidebar} />
      <div className="main-container h-screen w-full bg-[url('/src/assets/phone.svg')] bg-cover pt-[64px]">
        <div className='main-container__opacity flex h-full w-full bg-grey-50/75'>
          <aside
            className={`absolute z-[1] flex h-[calc(100%-64px)] w-[192.5px] flex-col justify-between border-r-[0.5px] border-brand-100 bg-grey-100 px-[32px] py-[32px] capitalize text-brand-300 transition-transform md:static md:h-full md:w-[268.5px] ${
              showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`.trim()}
          >
            <div className='aside-top flex flex-col gap-[16px]'>
              <h2 className='text-brand-gradient text-18-600 md:text-24-600'>
                olá, <span className='underline decoration-brand-100'>{'Mary'}</span>
              </h2>
              <ul className='text-14-700 md:text-20-600 flex flex-col gap-[20px] underline'>
                <li className='tw-aside-options'>
                  <BsGrid1X2Fill />
                  <span>dashboard</span>
                </li>
                <li className='tw-aside-options'>
                  <BsPersonLinesFill />
                  <span>perfil</span>
                </li>
                <li className='tw-aside-options'>
                  <BsPersonFillGear />
                  <span>editar perfil</span>
                </li>
                <li className='tw-aside-options'>
                  <BsPersonFillX />
                  <span>excluir conta</span>
                </li>
              </ul>
            </div>
            <button className='tw-aside-options text-14-700 md:text-20-600 h-fit capitalize' onClick={logout}>
              <IoLogOutSharp />
              <span>sair</span>
            </button>
          </aside>
          <main className='flex flex-1 flex-col gap-[24px] p-[32px] md:p-[64px]'>{children}</main>
        </div>
      </div>
    </>
  );
};

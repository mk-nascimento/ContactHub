import { useEffect, useState } from 'react';
import { BsFillShieldLockFill, BsGrid1X2Fill, BsPersonFillGear, BsPersonFillX, BsPersonLinesFill } from 'react-icons/bs';
import { IoLogOutSharp } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import { TProfileModalMode } from 'src/components/Forms/Profile/profile.interface';
import { Navbar } from 'src/components/Navbar';
import { Skeleton } from 'src/components/Skeleton';
import { Pathnames } from 'src/enums';
import { useAuth } from 'src/hooks/useAuth';
import { useUser } from 'src/hooks/useUser';

interface MainContainerProps {
  children?: React.ReactNode;
  modalModeStates?: [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>];
}

export const MainContainer = ({ modalModeStates, children }: MainContainerProps) => {
  const { pathname }: Partial<Location> = useLocation();
  const isProfilePage = pathname === Pathnames.Profile;

  const [showSidebar, setShowSidebar] = useState(false);

  const { authenticator } = useAuth();
  const { profile, userService } = useUser();
  const { logout } = authenticator;
  const { retrieve } = userService;

  const handleChanges = (mode: TProfileModalMode) => modalModeStates![1](mode);

  useEffect(() => {
    const loadProfile = async () => await retrieve();
    if (!profile) loadProfile();
  }, [profile, retrieve]);

  return (
    <>
      <Navbar sidebarStates={[showSidebar, setShowSidebar]} />
      <div className="main-container h-screen w-full bg-[url('/src/assets/phone.svg')] bg-cover pt-[64px]">
        <div className='opacity-cover flex h-full w-full bg-grey-50/75'>
          <aside
            className={`absolute z-[1] flex min-h-[calc(100%-64px)] w-[192.5px] flex-col justify-between border-r-[0.5px] border-brand-100 bg-grey-100 p-[32px] capitalize text-brand-300 transition-transform md:static md:min-h-full md:w-[268.5px] md:py-[64px] ${
              showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`.trim()}
          >
            <div className='aside-top flex flex-col gap-[16px]'>
              <h2 className='text-brand-gradient text-18-600 md:text-24-600'>
                olá, {profile && <span className='underline decoration-brand-100'>{profile.full_name.split(' ')[0]}</span>}
                {!profile && <Skeleton />}
              </h2>
              <ul className='text-14-700 md:text-20-600 flex flex-col gap-[20px] underline'>
                <li className='tw-aside-options'>
                  <BsGrid1X2Fill />
                  <Link to={Pathnames.Homepage}>dashboard</Link>
                </li>
                <li className='tw-aside-options'>
                  <BsPersonLinesFill />
                  <Link to={Pathnames.Profile}>perfil</Link>
                </li>
                {isProfilePage && (
                  <>
                    <li>
                      <button className='tw-aside-options capitalize' onClick={() => handleChanges('info')}>
                        <BsPersonFillGear />
                        <span>editar perfil</span>
                      </button>
                    </li>
                    <li>
                      <button className='tw-aside-options capitalize' onClick={() => handleChanges('pass')}>
                        <BsFillShieldLockFill />
                        <span>atualizar senha</span>
                      </button>
                    </li>
                    <li>
                      <button className='tw-aside-options capitalize' onClick={() => handleChanges('delete')}>
                        <BsPersonFillX />
                        <span>excluir conta</span>
                      </button>
                    </li>
                  </>
                )}
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

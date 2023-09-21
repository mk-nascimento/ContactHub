import { useLocation } from 'react-router-dom';
import greenLogo from '../../../assets/green.lo-go.svg';
import whiteLogo from '../../../assets/white.lo-go.svg';
import { Pathnames } from '../../../enums/paths';

interface IDisconnectedContainerProps {
  children: React.ReactNode;
}

export const DisconnectedContainer = (props: IDisconnectedContainerProps) => {
  const { pathname }: Partial<Location> = useLocation();

  const isNotDashboard: boolean = pathname !== Pathnames.Dashboard;

  return (
    <div className="min-h-screen md:flex md:flex-row-reverse md:bg-opacity-95 md:bg-[url('/src/assets/phone.svg')] md:bg-cover md:bg-no-repeat">
      <aside className="relative flex h-64 w-full justify-center bg-opacity-95 bg-[url('/src/assets/phone.svg')] bg-cover bg-no-repeat md:h-full md:w-1/2 md:bg-none">
        {isNotDashboard ? <img src={whiteLogo} alt='Logo' className='w-[210px] md:hidden' /> : null}

        <div className='absolute -bottom-0 h-[69px] w-full rounded-t-full bg-brand-100 md:hidden'>
          <div className='absolute -bottom-0 h-[59px] w-full rounded-t-full bg-brand-200'>
            <div className='absolute -bottom-0 h-[49px] w-full rounded-t-full bg-grey-50'></div>
          </div>
        </div>
      </aside>

      <main className='grid w-full grid-cols-1 content-center justify-items-center gap-[30px] bg-grey-50 px-12 pb-12 md:max-h-full md:flex-1 md:py-16'>
        {isNotDashboard ? (
          <header className='hidden w-[210px] md:block'>
            <img src={greenLogo} alt='Logo' />
          </header>
        ) : null}

        {props.children}
      </main>
    </div>
  );
};

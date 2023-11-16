import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import dashboardLogo from '../../assets/dashboard.lo-go.svg';
import { DisconnectedContainer } from '../../components/Container/Disconnected';
import { GradientBorderLink } from '../../components/Link/BorderGradient';
import { GradientLink } from '../../components/Link/Gradient';
import { Pathnames } from '../../enums';

export const Dashboard = () => {
  const { pathname }: Partial<Location> = useLocation();
  const currentPath: string | undefined = useMemo(() => pathname, [pathname]);

  useEffect(() => {
    document.title += ' - Dashboard';
    return () => {
      document.title = 'ContactHub';
    };
  }, [currentPath]);

  return (
    <DisconnectedContainer>
      <header className='grid w-[286px] grid-cols-1 gap-[20px] pt-[64px] text-center'>
        <img src={dashboardLogo} alt='Logo' />
        <p className='text-12-500'>Simplificando a gestão de contatos, um clique de cada vez.</p>
      </header>
      <div className='redirect-buttons grid w-11/12 grid-cols-1 gap-[16px] md:max-w-[30rem] md:grid-cols-2'>
        <GradientLink className='w-full' to={Pathnames.Register}>
          Cadastro
        </GradientLink>

        <GradientBorderLink to={Pathnames.Login}>Login</GradientBorderLink>
      </div>
    </DisconnectedContainer>
  );
};

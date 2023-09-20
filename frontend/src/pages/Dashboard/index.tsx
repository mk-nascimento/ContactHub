import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import dashboardLogo from '../../assets/dashboard.lo-go.svg';
import { DisconnectedContainer } from '../../components/Container/Disconnected.container.component';
import { GradientBorderLink } from '../../components/Link/Link.borderGradient.component';
import { GradientLink } from '../../components/Link/Link.gradient.component';

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
      <header className='w-[286px] pt-[64px] grid grid-cols-1 gap-[20px] text-center'>
        <img src={dashboardLogo} alt='Logo' />
        <p className='text-12-500'>Simplificando a gestão de contatos, um clique de cada vez.</p>
      </header>
      <div className='redirect-buttons w-11/12 grid grid-cols-1 gap-[16px] md:max-w-[30rem] md:grid-cols-2'>
        <GradientLink className='w-full' to='register'>
          Cadastro
        </GradientLink>

        <GradientBorderLink to='login'>Login</GradientBorderLink>
      </div>
    </DisconnectedContainer>
  );
};

import { IoExit } from 'react-icons/io5';

import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { Button } from '../Button';

export const Navbar = () => {
  const { pathname }: Partial<Location> = useLocation();
  const linkClass: string = 'font-semibold text-lg hover:underline hover:text-pink-500 transition-colors duration-500 cursor-pointer';

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 p-3 flex justify-center z-10">
      <div className="desk-container flex md:flex-row flex-col justify-between items-center gap-y-4">
        <img src={logo} alt="fullstack-challenge logo" className="h-[24px] hover:animate-pulse cursor-none" />

        <div className="flex flex-row flex-wrap items-center gap-x-6 gap-y-3">
          {pathname === '/profile' ? (
            <Link className={linkClass} to="/dashboard">
              Dashboard
            </Link>
          ) : (
            <Link className={linkClass} to="/profile">
              Perfil
            </Link>
          )}
          <Button type="button" addClass="text-xl">
            <IoExit />
          </Button>
        </div>
      </div>
    </nav>
  );
};

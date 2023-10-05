import { useMemo, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseSharp } from 'react-icons/io5';
import namedIcon from 'src/assets/named-icon.svg';

interface NavbarProps {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar = ({ setter }: NavbarProps) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleIcon = useMemo(() => (showSidebar ? <IoCloseSharp /> : <GiHamburgerMenu />), [showSidebar]);
  const toggleSidebar = () => {
    setter((prev) => !prev);
    setShowSidebar((prev) => !prev);
  };

  return (
    <nav className='fixed z-10 flex h-[64px] w-full items-center justify-between bg-grey-100'>
      <div className='logo-container relative flex h-full w-[192.5px] items-center justify-center border-r-[0.5px] border-brand-100 px-[32px] md:w-[268.5px]'>
        <img className='w-[128.5px] md:w-[168px]' src={namedIcon} alt='Logo + Project name' />
      </div>
      <div className='absolute right-0 flex h-full w-fit items-center px-[32px] md:hidden'>
        <button onClick={toggleSidebar} className='text-brand-200 transition-colors duration-300 hover:text-brand-300'>
          {toggleIcon}
        </button>
      </div>
      <div className='absolute bottom-0 h-[1px] w-full bg-brand-100 blur-[2px]'></div>
    </nav>
  );
};

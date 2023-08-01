import logo from '../../assets/logo.svg';
import { Button } from '../Button';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 p-[12px] flex md:flex-row flex-col justify-between items-center ">
      <img src={logo} alt="fullstack-challenge logo" className="h-[24px]" />

      <div className="flex md:flex-row flex-col flex-wrap gap-[24px]">
        <ul className="flex md:flex-row flex-col items-center gap-[8px]">
          <li className="hover:underline hover:text-pink-500 cursor-pointer">Atualizar Perfil</li>
        </ul>

        <Button text="Sair" type="button" />
      </div>
    </nav>
  );
};

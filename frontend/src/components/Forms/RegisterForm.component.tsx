import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { TUserData, userSchema } from '../../schemas';
import { Button } from '../Button';
import { Input } from './Input.component';

export const RegisterForm = () => {
  const { registerUser } = useUser();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TUserData>({ resolver: zodResolver(userSchema) });

  return (
    <form onSubmit={handleSubmit(registerUser)} className="form">
      <Link to="/" className="absolute top-6 left-6 font-semibold hover:underline hover:text-pink-500 transition-colors duration-500 cursor-pointer">
        {'<'} Login
      </Link>
      <h2 className="text-2xl font-bold mb-4 text-gray-50 text-center">Cadastro</h2>

      <div className="grid gap-[22px]">
        <Input error={errors.full_name} id="name" placeholder="Nome Completo" register={register('full_name')} type="text" />
        <Input error={errors.email} id="email" placeholder="Email" register={register('email')} type="email" />
        <Input error={errors.password} id="password" placeholder="Password" register={register('password')} type="password" />
        <Input error={errors.confirm} id="confirm" placeholder="Confirme a senha" register={register('confirm')} type="password" />
      </div>

      <Button text="Cadastrar" type="submit" addClass="w-full" />
    </form>
  );
};

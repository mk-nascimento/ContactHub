import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { TLoginData, loginSchema } from '../../schemas';
import { Button } from '../Button';
import { Input } from './Input.component';

export const LoginForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TLoginData>({ resolver: zodResolver(loginSchema) });

  const { login } = useAuth();

  return (
    <form onSubmit={handleSubmit(login)} className="form">
      <Link
        to="/register"
        className="absolute top-6 right-6 font-semibold hover:underline hover:text-pink-500 transition-colors duration-500 cursor-pointer"
      >
        Registre-se {'>'}
      </Link>
      <h2 className="text-2xl font-bold mb-4 text-gray-50 text-center">Login</h2>

      <div className="grid gap-[22px]">
        <Input error={errors.email} id="email" placeholder="Email" register={register('email')} type="email" />
        <Input error={errors.password} id="password" placeholder="Password" register={register('password')} type="password" />
      </div>

      <Button text="Login" type="submit" addClass="w-full" />
    </form>
  );
};

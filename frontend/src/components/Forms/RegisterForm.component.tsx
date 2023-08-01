import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import { TRegisterData, registerSchema } from '../../schemas';
import api from '../../services/axios';
import { Button } from '../Button';
import { Input } from './Input.component';

interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  role: 'client' | 'admin';
}

export const RegisterForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TRegisterData>({ resolver: zodResolver(registerSchema) });

  const navigate = useNavigate();

  const registerUser = async (data: TRegisterData) => {
    try {
      const response = await api.post<RegisterResponse>('users/', data);
      const { id } = response.data;
      if (id) {
        const loginResponse = await api.post<{ token: string }>('login/', data);

        const { token } = loginResponse.data;

        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        localStorage.setItem('@fullstack-challenge:token', token);

        navigate('dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(registerUser)}
      className="flex flex-col items-center justify-center shadow-md bg-gray-900 rounded-lg px-[22px] py-[42px] gap-[24px]"
    >
      <h2 className="text-2xl font-bold mb-4">Cadastro</h2>

      <div className="grid gap-[22px]">
        <Input error={errors.name} id="name" placeholder="name" register={register('name')} type="text" />
        <Input error={errors.email} id="email" placeholder="Email" register={register('email')} type="email" />
        <Input error={errors.password} id="password" placeholder="Password" register={register('password')} type="password" />
        <Input error={errors.confirm} id="confirm" placeholder="Confirme a senha" register={register('confirm')} type="password" />
      </div>

      <Button text="Cadastrar" type="submit" addClass="w-full" />
    </form>
  );
};

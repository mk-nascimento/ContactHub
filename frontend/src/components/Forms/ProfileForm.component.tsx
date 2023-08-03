import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useUser } from '../../hooks/useUser';
import { TUserData, userSchema } from '../../schemas';
import { Button } from '../Button';
import { Input } from './Input.component';

export const ProfileForm = () => {
  const { profile } = useUser();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TUserData>({ resolver: zodResolver(userSchema) });

  return (
    <form
      onSubmit={handleSubmit(() => console.log('Profile Form'))}
      className="transition-all duration-300 ease-in-out flex flex-col items-center justify-center shadow-md bg-gray-900 rounded-lg px-[22px] py-[42px] gap-[24px]"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-50">Informações de perfil</h2>

      <div className="grid gap-[22px]">
        <Input
          error={errors.full_name}
          id="name"
          placeholder="Nome Completo"
          register={register('full_name', { value: profile?.full_name })}
          type="text"
        />
        <Input error={errors.email} id="email" placeholder="Email" register={register('email', { value: profile?.email })} type="email" />
        <Input error={errors.password} id="cellphone" placeholder="Senha" register={register('password', { value: '' })} type="password" />
        <Input error={errors.confirm} id="confirm" placeholder="Confirme a senha" register={register('confirm', { value: '' })} type="password" />
      </div>

      <Button text="Atualizar" type="submit" addClass="w-full" />
    </form>
  );
};

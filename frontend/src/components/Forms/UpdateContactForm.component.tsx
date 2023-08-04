import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useContact } from '../../hooks/useContact';
import { TContactPayload, contactSchema } from '../../schemas';
import { Button } from '../Button';
import { Input } from './Input.component';

export const UpdateContactForm = () => {
  const { updateContact, selectedContact } = useContact();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TContactPayload>({ resolver: zodResolver(contactSchema) });

  return (
    <form onSubmit={handleSubmit(updateContact)} className="form">
      <h2 className="text-2xl font-bold mb-4 text-gray-50 text-center">Informações de contato</h2>

      <div className="grid gap-[22px]">
        <Input
          error={errors.full_name}
          id="name"
          placeholder="Nome"
          register={register('full_name', { value: selectedContact.full_name })}
          type="text"
        />
        <Input error={errors.email} id="email" placeholder="Email" register={register('email', { value: selectedContact.email })} type="email" />
        <Input
          error={errors.cellphone}
          id="cellphone"
          placeholder="Telefone"
          register={register('cellphone', { value: selectedContact.cellphone })}
          type="text"
        />
      </div>

      <Button text="Atualizar" type="submit" addClass="w-full" />
    </form>
  );
};

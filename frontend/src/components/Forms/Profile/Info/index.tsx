import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUser } from 'src/hooks/useUser';
import { TUserInfoData, userInfoSchema } from 'src/schemas';
import { Input } from '../../Input';

interface Props {
  modalControl(): void;
}

export const InfoForm = (props: Props) => {
  const { userService, profile } = useUser();
  const useFormMethods = useForm<TUserInfoData>({ resolver: zodResolver(userInfoSchema) });
  const { formState, handleSubmit, register } = useFormMethods;
  const { errors } = formState;
  const { update } = userService;

  const submit: SubmitHandler<TUserInfoData> = (data) => {
    update(data);
    props.modalControl();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className='flex w-full flex-col gap-[24px]'>
      <h2 className='text-20-600 w-full text-center capitalize text-grey-600'>editar perfil</h2>

      <Input
        error={errors.full_name}
        register={register('full_name', { value: profile?.full_name })}
        className='block w-full'
        type='text'
        label='Nome'
        placeholder='Full Name'
      />
      <Input
        error={errors.email}
        register={register('email', { value: profile?.email })}
        className='block w-full'
        type='email'
        label='Email'
        placeholder='mail@mail.com'
      />
      <Input
        error={errors.phone}
        register={register('phone', { value: profile?.phone })}
        className='block w-full'
        type='tel'
        label='Telefone'
        placeholder='(**) * **** ****'
      />

      <div className='buttons flex flex-row justify-between gap-[24px] pt-[16px]'>
        <button
          className='text-12-700 w-full rounded-[24px] bg-input-alert py-[15px] capitalize text-grey-100'
          onClick={props.modalControl}
          type='reset'
        >
          cancelar
        </button>
        <button className='text-12-700 w-full rounded-[24px] bg-brand-200 py-[15px] capitalize text-grey-50' type='submit'>
          atualizar
        </button>
      </div>
    </form>
  );
};

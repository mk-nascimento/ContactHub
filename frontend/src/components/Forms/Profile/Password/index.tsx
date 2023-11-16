import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUser } from 'src/hooks/useUser';
import { TPassword, passwordSchema } from 'src/schemas';
import { Input } from '../../Input';

interface Props {
  modalControl(): void;
}

export const PasswordForm = (props: Props) => {
  const { userService } = useUser();
  const useFormMethods = useForm<TPassword>({ resolver: zodResolver(passwordSchema) });
  const { formState, handleSubmit, register } = useFormMethods;
  const { errors } = formState;
  const { update } = userService;

  const submit: SubmitHandler<TPassword> = (data) => {
    update(data);
    props.modalControl();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className='flex w-full flex-col gap-[24px]'>
      <h2 className='text-20-600 w-full text-center capitalize text-grey-600'>atualizar senha</h2>
      <Input
        label='Senha atual'
        className='block w-full'
        error={errors.current}
        placeholder='********'
        register={register('current')}
        type='password'
      />
      <Input
        label='Nova senha'
        className='block w-full'
        error={errors.password}
        placeholder='********'
        register={register('password')}
        type='email'
      />
      <Input
        label='Confirme nova senha'
        className='block w-full'
        error={errors.confirm}
        placeholder='********'
        register={register('confirm')}
        type='tel'
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

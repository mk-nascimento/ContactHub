import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from 'src/components/Forms/Input';
import { useContact } from 'src/hooks/useContact';
import { IContact } from 'src/interfaces';
import { contactSchema } from 'src/schemas';

interface Props {
  modalControl(): void;
}

export const ContactCreateForm = (props: Props) => {
  const formMethods = useForm<IContact>({ resolver: zodResolver(contactSchema) });
  const { contactService } = useContact();
  const { formState, handleSubmit, register } = formMethods;
  const { errors } = formState;
  const { create } = contactService;

  const submit: SubmitHandler<IContact> = async (data) => await create(data).then(props.modalControl);
  return (
    <form onSubmit={handleSubmit(submit)} className='flex w-full flex-col gap-[24px]'>
      <h2 className='text-20-600 w-full text-center capitalize text-grey-600'>criar contato</h2>

      <Input
        error={errors.full_name}
        register={register('full_name')}
        className='block w-full'
        type='text'
        label='Nome'
        placeholder='Full Name'
      />
      <Input
        error={errors.email}
        register={register('email')}
        className='block w-full'
        type='email'
        label='Email'
        placeholder='mail@mail.com'
      />
      <Input
        error={errors.phone}
        register={register('phone')}
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
          adicionar contato
        </button>
      </div>
    </form>
  );
};

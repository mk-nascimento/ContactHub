import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Pathnames } from '../../../enums';
import { useUser } from '../../../hooks/useUser';
import { TUserData, userSchema } from '../../../schemas';
import { GradientButton } from '../../Buttons/Gradient';
import { Input } from '../Input';
import inputRegisterFields from './input.register.fields';

type TInputNames = 'full_name' | 'email' | 'phone' | 'password' | 'confirm';

export const RegisterForm = () => {
  const {
    userService: { register: submit },
  } = useUser();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TUserData>({ resolver: zodResolver(userSchema) });

  return (
    <form onSubmit={handleSubmit(submit)} className='tw-user-forms'>
      <div className='tw-user-forms__header'>
        <h1 className='tw-user-forms__title'>Crie sua conta</h1>

        <p className='tw-user-forms__tips'>
          Já possui uma conta?{' '}
          <Link to={Pathnames.Login} className='tw-user-forms__redirect'>
            Login
          </Link>
        </p>
      </div>

      {inputRegisterFields.map((fields) => (
        <Input
          key={fields.id}
          error={errors[fields.id as TInputNames]}
          fields={fields}
          register={register(fields.id as TInputNames)}
        />
      ))}

      <GradientButton text='Cadastrar' type='submit' />
    </form>
  );
};

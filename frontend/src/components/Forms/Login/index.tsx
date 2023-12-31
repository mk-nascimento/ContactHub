import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { GradientButton } from 'src/components/Buttons/Gradient';
import { Pathnames } from 'src/enums';
import { useAuth } from 'src/hooks/useAuth';
import { TLoginData, loginSchema } from 'src/schemas';
import { Input } from '../Input';

export const LoginForm = () => {
  const {
    authenticator: { login },
  } = useAuth();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TLoginData>({ resolver: zodResolver(loginSchema) });

  return (
    <form onSubmit={handleSubmit(login)} className='tw-user-forms'>
      <div className='tw-user-forms__header'>
        <h1 className='tw-user-forms__title'>Login</h1>

        <p className='tw-user-forms__tips'>
          Ainda não possui uma conta?{' '}
          <Link to={Pathnames.Register} className='tw-user-forms__redirect'>
            Cadastro
          </Link>
        </p>
      </div>

      <Input
        label='Email'
        className='new-input block w-full'
        error={errors.email}
        placeholder='mail@mail.com'
        register={register('email')}
        type='email'
      />

      <Input
        label='Senha'
        className='new-input block w-full'
        error={errors.password}
        placeholder='********'
        register={register('password')}
        type='password'
      />

      <GradientButton text='Login' type='submit' />
    </form>
  );
};

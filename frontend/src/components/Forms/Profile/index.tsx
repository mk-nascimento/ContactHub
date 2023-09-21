import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TUserData, userSchema } from '../../../schemas';

export const ProfileForm = () => {
  const { handleSubmit } = useForm<TUserData>({ resolver: zodResolver(userSchema) });

  return <form onSubmit={handleSubmit(() => console.log('Profile Form'))} className=''></form>;
};

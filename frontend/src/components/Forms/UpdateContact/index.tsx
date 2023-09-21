import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TContactPayload, contactSchema } from '../../../schemas';

export const UpdateContactForm = () => {
  const { handleSubmit } = useForm<TContactPayload>({ resolver: zodResolver(contactSchema) });

  return <form onSubmit={handleSubmit(() => {})} className=''></form>;
};

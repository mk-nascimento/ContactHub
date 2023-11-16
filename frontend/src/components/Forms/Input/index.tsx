import { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { phoneMask } from 'utils/string.utils';

interface IInputFields {
  className: string;
  id: string;
  label: string;
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
}

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  fields?: IInputFields;
  label?: string;
  register?: UseFormRegisterReturn<string>;
}

export const Input = ({ error, fields, label, register, ...rest }: IInputProps) => {
  const className = `new-input mt-[10px] ${fields?.className ?? ''} ${rest.className ?? ''}`.trim().replace(/\s+/g, ' ');
  const mask = (e: React.FormEvent<HTMLInputElement>) => (e.currentTarget.type === 'tel' ? phoneMask(e) : undefined);

  return (
    <label className='text-14-400 relative cursor-pointer text-grey-600' htmlFor={rest.id}>
      {fields?.label ?? label} <span className='inline-flex text-input-alert'>* {error ? error.message : null} </span>{' '}
      <input {...fields} {...rest} {...register} className={className} onInput={mask} />
    </label>
  );
};

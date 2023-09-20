import { InputHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface IInputFields {
  className: string;
  id: string;
  label: string;
  name: string;
  placeholder: string;
  type: string;
}

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  fields?: IInputFields;
  label?: string;
  register?: UseFormRegisterReturn<string>;
}

export const Input = ({
  error,
  fields,
  label,
  register,
  ...rest
}: IInputProps) => {
  return (
    <label
      className='relative text-14-400 text-grey-600 cursor-pointer'
      htmlFor={rest.id}
    >
      {fields?.label ?? label ?? 'Insert label'}{' '}
      <span className='inline-flex text-input-alert'>
        * {error ? error.message : null}{' '}
      </span>{' '}
      <input
        {...rest}
        {...register}
        className={`new-input mt-[10px]
        ${fields?.className ?? ''}
        ${rest.className ?? ''}`.trim()}
        id={fields?.id ?? rest.id ?? undefined}
        name={fields?.name ?? rest.name ?? undefined}
        placeholder={fields?.placeholder ?? rest.placeholder ?? undefined}
        type={fields?.type ?? rest.type ?? 'text'}
      />
    </label>
  );
};

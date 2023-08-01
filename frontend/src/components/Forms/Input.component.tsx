import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  error: FieldError | undefined;
  id: string;
  placeholder: string;
  register: UseFormRegisterReturn<string>;
  type?: React.HTMLInputTypeAttribute | undefined;
  value?: string;
}

export const Input = (props: InputProps) => {
  return (
    <>
      <label htmlFor={props.id} className="block text-gray-50 font-bold mb-1 cursor-pointer">
        {props.placeholder} :
        <input
          id={props.id}
          placeholder={props.placeholder}
          {...props.register}
          type={props.type ? props.type : 'te'}
          className={`w-full bg-gray-200 text-gray-700 placeholder-gray-400 border rounded-md px-[8px] py-[6px] outline-none ${
            props.error ? 'border-red-500' : 'border-gray-300 focus:border-pink-500 hover:border-pink-400 transition-colors duration-500'
          } focus:ring focus:ring-pink-300`}
        />
      </label>
      {props.error && <span className="text-red-500 text-sm my-[2px]">{props.error.message}</span>}
    </>
  );
};

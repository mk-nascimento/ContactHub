import { ButtonHTMLAttributes } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const GradientButton = ({ text, ...rest }: IButtonProps) => (
  <button
    {...rest}
    className={`bg-gradient-to-r from-brand-200 to-brand-300 rounded-3xl text-18-600 text-grey-50 text-center p-[10px] ${
      rest.className ? rest.className : null
    }`}
  >
    {text}
  </button>
);

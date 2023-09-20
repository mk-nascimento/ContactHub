import { Link, LinkProps } from 'react-router-dom';

interface IButtonProps extends LinkProps {}

export const GradientLink = (props: IButtonProps) => (
  <Link
    {...props}
    className={`bg-gradient-to-r from-brand-200 to-brand-300 rounded-3xl text-18-600 text-grey-50 text-center p-[10px]
    ${props.className ?? ''}`.trim()}
  >
    {props.children}
  </Link>
);

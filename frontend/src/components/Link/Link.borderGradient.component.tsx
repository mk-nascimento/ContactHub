import { Link, LinkProps } from 'react-router-dom';

interface IButtonProps extends LinkProps {}

export const GradientBorderLink = (props: IButtonProps) => (
  <div className='bg-gradient-to-r from-brand-200 to-brand-300 p-[3px] rounded-3xl'>
    <Link
      {...props}
      className={`rounded-3xl text-18-600 text-grey-600 text-center p-[9px] bg-grey-50 w-full inline-block
      ${props.className ?? ''}`.trim()}
    >
      {props.children}
    </Link>
  </div>
);

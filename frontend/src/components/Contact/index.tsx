import { LiHTMLAttributes } from 'react';

interface Props extends LiHTMLAttributes<HTMLLIElement> {}

export const ContactCard = (props: Props) => <li {...props}></li>;

import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLUListElement> {}

export const ContactList = (props: Props) => <ul {...props}></ul>;

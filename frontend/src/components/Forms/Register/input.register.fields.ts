import { HTMLInputTypeAttribute } from 'react';

interface IFields {
  [key: string]: string;
}

interface InputTypes {
  [key: string]: HTMLInputTypeAttribute;
}

const labels: IFields = {
  full_name: 'Nome completo',
  email: 'Email',
  phone: 'Telefone',
  password: 'Senha',
  confirm: 'Confirme sua senha',
};

const types: InputTypes = {
  confirm: 'password',
  email: 'email',
  full_name: 'text',
  password: 'password',
  phone: 'tel',
};

const placeholders: IFields = {
  confirm: '********',
  email: 'mail@mail.com',
  full_name: 'John Doe',
  password: '********',
  phone: '(52) 9 1234 5678',
};

export default Object.keys(labels).map((key) => ({
  className: 'block w-full',
  id: key,
  label: labels[key],
  name: key,
  placeholder: placeholders[key],
  type: types[key],
}));

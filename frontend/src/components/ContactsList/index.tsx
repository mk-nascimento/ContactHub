import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const ContactList = ({ children }: Props) => {
  return (
    <ul className="w-[300px] md:w-full bg-gray-900 rounded-md p-[20px] flex flex-col gap-y-4 border border-gray-600 max-h-[500px] overflow-y-auto">
      <h2 className="font-bold text-center text-xl mb-4">Contatos</h2>
      {children}
    </ul>
  );
};

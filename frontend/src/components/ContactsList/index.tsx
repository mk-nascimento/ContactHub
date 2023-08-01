import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const ContactList = ({ children }: Props) => {
  return (
    <ul className="bg-gray-900 rounded-[8px] px-[28px] py-[20px] flex flex-col gap-[18px] border-[1px] border-gray-700 md:w-[600px] lg:w-[720px]">
      <h2 className="text-center font-semibold">Contatos</h2>
      {children}
    </ul>
  );
};

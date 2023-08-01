import React from 'react';

interface Props {
  children?: React.ReactNode;
}

export const MainContainer = (props: Props) => (
  <main className="flex flex-col items-center min-h-screen justify-center bg-gray-950">{props.children}</main>
);

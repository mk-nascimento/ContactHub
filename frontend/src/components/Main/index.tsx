interface Props {
  children?: React.ReactNode;
  addClass?: string;
}

export const MainContainer = (props: Props) => <main className={`flex flex-col items-center mx-auto mb-2 ${props.addClass}`}>{props.children}</main>;

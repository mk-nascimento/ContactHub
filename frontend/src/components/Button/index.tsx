interface Props {
  addClass?: string;
  text?: string;
  type: 'submit' | 'button';
  children?: React.ReactNode;
  onClickButton?: () => void;
}

export const Button = ({ addClass, onClickButton, text, type, children }: Props) => (
  <button
    onClick={onClickButton}
    className={`px-4 py-2 font-medium text-white bg-gray-500 hover:bg-pink-600 transition-colors duration-500 rounded-md ${addClass}`}
    type={type ? type : 'button'}
  >
    {children}
    {text}
  </button>
);

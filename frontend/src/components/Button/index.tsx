interface Props {
  addClass?: string;
  text: string;
  type: 'submit' | 'button';
}

export const Button = ({ addClass, text, type }: Props) => (
  <button
    className={`px-4 py-2 font-medium text-white bg-gray-500 hover:bg-pink-600 transition-colors duration-500 rounded-md ${addClass}`}
    type={type ? type : 'button'}
  >
    {text}
  </button>
);

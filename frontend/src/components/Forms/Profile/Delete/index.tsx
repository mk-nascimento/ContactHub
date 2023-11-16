import { useUser } from 'src/hooks/useUser';

interface Props {
  modalControl(): void;
}

export const DeleteProfile = (props: Props) => {
  const { userService } = useUser();
  const { destroy } = userService;
  const handleDestroy = async () => {
    await destroy();
    props.modalControl();
  };
  return (
    <div className='flex flex-col gap-[24px]'>
      <h3 className='text-20-600 text-center text-grey-600'>Deseja realmente excluir sua conta ?</h3>
      <div className='buttons flex flex-row justify-between gap-[24px] pt-[16px] capitalize'>
        <button className='text-12-700 w-full rounded-[24px] bg-brand-200 py-[15px] text-grey-50' onClick={props.modalControl}>
          cancelar
        </button>
        <button className='text-12-700 w-full rounded-[24px] bg-input-alert py-[15px] text-grey-100' onClick={handleDestroy}>
          excluir conta
        </button>
      </div>
    </div>
  );
};

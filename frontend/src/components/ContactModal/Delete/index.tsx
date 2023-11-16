import { useContact } from 'src/hooks/useContact';

interface Props {
  modalControl(): void;
}
export const ContactDeleteModal = (props: Props) => {
  const { contactService } = useContact();
  const { destroy } = contactService;

  const handleDestroy = async () => await destroy().then(props.modalControl);

  return (
    <div className='flex flex-col gap-[24px]'>
      <h3 className='text-20-600 text-center text-grey-600'>Deseja realmente excluir este contato ?</h3>
      <div className='buttons flex flex-row justify-between gap-[24px] pt-[16px] capitalize'>
        <button
          className='text-12-700 w-full rounded-[24px] bg-brand-200 py-[10px] capitalize text-grey-50'
          onClick={props.modalControl}
        >
          cancelar
        </button>
        <button
          className='text-12-700 w-full rounded-[24px] bg-input-alert py-[10px] capitalize text-grey-100'
          onClick={handleDestroy}
        >
          excluir contato
        </button>
      </div>
    </div>
  );
};

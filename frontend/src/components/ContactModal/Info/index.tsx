import { useContact } from 'src/hooks/useContact';
import { TContactModalMode } from '../contactModal.interface';

interface Props {
  handleModal: (mode: TContactModalMode) => void;
}

export const ContactInfoModal = (props: Props) => {
  const { highlightedStates } = useContact();
  const { '0': contact } = highlightedStates;

  return (
    <div className='flex flex-col gap-[24px]'>
      <h3 className='text-20-600 text-center text-grey-600'>Informações de Contato</h3>
      <div>
        <h3 className='text-12-500 text-grey-700'>Nome :</h3>
        <p className='text-14-400 border-b border-grey-200 pl-[16px] text-grey-500'>{contact?.full_name}</p>
      </div>
      <div>
        <h3 className='text-12-500 text-grey-700'>Email :</h3>
        <p className='text-14-400 border-b border-grey-200 pl-[16px] text-grey-500'>{contact?.email}</p>
      </div>
      <div>
        <h3 className='text-12-500 text-grey-700'>Telefone : </h3>
        <p className='text-14-400 border-b border-grey-200 pl-[16px] text-grey-500'>{contact?.phone}</p>
      </div>
      <div>
        <h3 className='text-12-500 text-grey-700'>Cadastrado em :</h3>
        <p className='text-14-400 border-b border-grey-200 pl-[16px] text-grey-500'>
          {new Date(contact!.created_at).toLocaleDateString('pt-BR')}
        </p>
      </div>
      <div className='flex flex-row gap-[24px]'>
        <button
          className='text-12-700 w-full rounded-[24px] bg-input-alert py-[10px] capitalize text-grey-100'
          onClick={() => props.handleModal('delete')}
        >
          excluir
        </button>
        <button
          className='text-12-700 w-full rounded-[24px] bg-brand-200 py-[10px] capitalize text-grey-50'
          onClick={() => props.handleModal('update')}
        >
          atualizar
        </button>
      </div>
    </div>
  );
};

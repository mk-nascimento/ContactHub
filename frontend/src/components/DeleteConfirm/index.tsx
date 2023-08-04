import { useContact } from '../../hooks/useContact';
import { useUser } from '../../hooks/useUser';

interface Props {
  deleteType: 'contact' | 'profile';
}

export const DeleteConfirm = ({ deleteType }: Props) => {
  const { deleteContact } = useContact();
  const { setDeleteProfileModal, deleteUser } = useUser();

  const titleClass: string = 'font-semibold text-center text-lg';
  const buttonClass: string = 'font-semibold text-center px-2 py-1 rounded';

  const confirmDelete = async () => {
    if (deleteType == 'contact')
      try {
        await deleteContact();
      } catch (error) {
        console.error(error);
      }
    else if (deleteType == 'profile')
      try {
        await deleteUser();
      } catch (error) {
        console.error(error);
      }
  };

  const closeModal = () => setDeleteProfileModal(false);
  return (
    <div className="flex flex-col gap-6 bg-gray-900 p-9 max-md:w-[300px] border border-gray-400 rounded-lg">
      {deleteType == 'contact' ? (
        <h2 className={titleClass}>Deseja deletar o contato ?</h2>
      ) : deleteType == 'profile' ? (
        <h2 className={titleClass}>Deseja deletar seu perfil ?</h2>
      ) : (
        <></>
      )}
      <div className="flex justify-between">
        <button className={`${buttonClass} bg-gray-700`} onClick={closeModal}>
          Cancelar
        </button>
        <button className={`${buttonClass} bg-red-500`} onClick={confirmDelete}>
          Confirmar
        </button>
      </div>
    </div>
  );
};

import { useEffect, useMemo, useState } from 'react';
import { ContactList } from 'src/components/ContactsList';
import { MainContainer } from 'src/components/Container/Main';
import { DeleteProfile } from 'src/components/Forms/Profile/Delete';
import { InfoForm } from 'src/components/Forms/Profile/Info';
import { PasswordForm } from 'src/components/Forms/Profile/Password';
import { Modal } from 'src/components/Modal';
import { Skeleton } from 'src/components/Skeleton';
import { useUser } from 'src/hooks/useUser';
import { handleProfilePdf } from 'utils/profile.pdf';

export const Profile = () => {
  const { profile } = useUser();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'info' | 'pass' | 'delete'>();

  const renderEditForm = useMemo(() => {
    switch (modalMode) {
      case 'info':
        return <InfoForm modalControl={() => setOpenModal(false)} />;
      case 'pass':
        return <PasswordForm modalControl={() => setOpenModal(false)} />;
      case 'delete':
        return <DeleteProfile modalControl={() => setOpenModal(false)} />;
    }
  }, [modalMode]);

  useEffect(() => {
    if (modalMode) setOpenModal(true);
  }, [modalMode]);
  useEffect(() => {
    if (!openModal) setModalMode(undefined);
  }, [openModal]);

  return (
    <>
      <MainContainer setModalMode={setModalMode}>
        <div className='tw-authenticated-main-child user-info-container flex shrink-0 grow-0 basis-auto flex-col'>
          <div className='tw-authenticated-main-child__content flex flex-col gap-[16px] px-[16px] pb-[16px]'>
            {profile && (
              <h3 className='text-18-600 truncate text-center capitalize text-grey-800 underline'>{profile.full_name}</h3>
            )}
            {!profile && <Skeleton />}
            <div className='flex flex-col gap-[16px] md:flex-row md:items-center md:justify-between '>
              <div className='flex w-full flex-col gap-[12px] text-grey-700'>
                <p className={`text-14-700 ${profile ? '' : 'inline-flex'}`.trim()}>
                  Email: {profile && <span className='text-14-400 truncate pl-[16px] text-grey-600'>{profile.email}</span>}
                  {!profile && <Skeleton />}
                </p>
                <p className={`text-14-700 ${profile ? '' : 'inline-flex'}`.trim()}>
                  Telefone: {profile && <span className='text-14-400 truncate pl-[16px] text-grey-600'>{profile.phone}</span>}
                  {!profile && <Skeleton />}
                </p>
              </div>

              <button
                onClick={() => handleProfilePdf(profile!)}
                className='text-14-700 w-full rounded-[8px] border border-brand-neutral py-[6px] text-center text-brand-300 md:min-w-fit md:max-w-[120px] md:px-[26px]'
              >
                Exportar dados
              </button>
            </div>
          </div>
        </div>
        <ContactList view />
      </MainContainer>
      <Modal statePair={[openModal, setOpenModal]}>{renderEditForm}</Modal>
    </>
  );
};

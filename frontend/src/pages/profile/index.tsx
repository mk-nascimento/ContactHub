import { useEffect } from 'react';
import { BiExport } from 'react-icons/bi';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import { ContactCard } from '../../components/Contact';
import { ContactList } from '../../components/ContactsList';
import { DeleteConfirm } from '../../components/DeleteConfirm';
import { ProfileForm } from '../../components/Forms/ProfileForm.component';
import { MainContainer } from '../../components/Main';
import { CustomModal } from '../../components/Modal';
import { Navbar } from '../../components/Navbar';
import { useUser } from '../../hooks/useUser';
import { Contact } from '../../interfaces/global.interfaces';
import api from '../../services/axios';

export const Profile = () => {
  const {
    profile,
    getProfile,
    isOpenModal: update,
    exportProfile,
    setIsOpenModal: setEditModal,
    deleteProfileModal: deleteProfile,
    setDeleteProfileModal,
  } = useUser();
  const contacts: Contact[] | undefined = profile?.contacts;

  useEffect(() => {
    document.title = 'Perfil';

    if (api.defaults.headers.common.Authorization) (async () => await getProfile())();

    return () => {
      document.title = 'Fullstack Challenge';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContacts = (contactsToRender: Contact[]) =>
    contactsToRender.map((contact) => <ContactCard key={contact.id} contact={contact} viewMode={true} />);
  const truncatedName = (maxChar: number) =>
    profile?.full_name && profile.full_name.length > maxChar ? `${profile.full_name.slice(0, maxChar)}...` : profile?.full_name;

  return (
    <>
      <Navbar />
      <div className="md:mt-28 mt-36 w-full flex flex-col items-center gap-6">
        <header className="relative w-[300px] md:w-[600px] lg:w-[720px] px-4 py-5 bg-gray-900 rounded-md border border-gray-600">
          <h2 className="font-bold text-center text-xl mb-4">Informações de perfil</h2>
          <button
            onClick={() => exportProfile(profile!)}
            className="absolute top-6 right-4 text-xl text-gray-50 hover:text-pink-500 transition-colors duration-500 animate-pulse"
          >
            <BiExport />
          </button>

          <div id="profile" className="flex max-md:flex-col max-md:gap-y-4">
            <div id="profile-info" className="grid gap-4 flex-1">
              <p className="font-semibold text-lg">
                Nome:
                <span className="font-medium text-base ml-4" title={profile?.full_name}>
                  {truncatedName(15)}
                </span>
              </p>
              <p className="font-semibold text-lg">
                Email:
                <span className="font-medium text-base ml-4" title={profile?.email}>
                  {profile?.email}
                </span>
              </p>
            </div>

            <div id="profile-options" className="flex gap-4 justify-around md:w-fit md:ml-auto md:flex-col md:justify-between">
              <button
                className="w-fit p-2 rounded-md cursor-pointer transition-colors duration-500 hover:scale-1 hover:bg-pink-500"
                onClick={() => setEditModal(true)}
              >
                <FaEdit />
              </button>

              <button
                className="w-fit p-2 rounded-md cursor-pointer transition-colors duration-500 hover:scale-1 hover:bg-pink-500"
                onClick={() => setDeleteProfileModal(true)}
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        </header>

        <MainContainer addClass="w-[300px] md:w-[600px] lg:w-[720px] rounded-md">
          {contacts?.length ? (
            <ContactList>{renderContacts(contacts)}</ContactList>
          ) : (
            <div className="w-full bg-gray-900 rounded-md p-[20px] flex flex-col gap-y-4 border border-gray-600">
              <h2 className="font-bold text-center text-xl mb-4">Contatos</h2>
              <small className="text-center">Sua lista de contatos está vazia</small>
            </div>
          )}
          <CustomModal>{update ? <ProfileForm /> : deleteProfile ? <DeleteConfirm deleteType="profile" /> : <></>}</CustomModal>
        </MainContainer>
      </div>
    </>
  );
};

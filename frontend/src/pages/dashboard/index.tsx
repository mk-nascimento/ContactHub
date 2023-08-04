import { useEffect } from 'react';

import { AddContactButton } from '../../components/Button/AddContactButton';
import { ContactCard } from '../../components/Contact';
import { ContactList } from '../../components/ContactsList';
import { DeleteConfirm } from '../../components/DeleteConfirm';
import { AddContactForm } from '../../components/Forms/AddContactForm.component';
import { UpdateContactForm } from '../../components/Forms/UpdateContactForm.component';
import { MainContainer } from '../../components/Main';
import { CustomModal } from '../../components/Modal';
import { Navbar } from '../../components/Navbar';
import { useContact } from '../../hooks/useContact';
import { Contact } from '../../interfaces/global.interfaces';

export const Dashboard = () => {
  const { contacts, selectedContact, deleteContactModal, addContactModal } = useContact();

  useEffect(() => {
    document.title = 'Dashboard';
    return () => {
      document.title = 'Fullstack Challenge';
    };
  }, []);

  const renderContacts = (contactsToRender: Contact[]) => contactsToRender.map((contact) => <ContactCard key={contact.id} contact={contact} />);

  return (
    <>
      <Navbar />
      <MainContainer addClass="desk-container justify-center md:mt-28 mt-44">
        {contacts?.length ? (
          <ContactList>{renderContacts(contacts)}</ContactList>
        ) : (
          <div className="w-full max-md:w-[300px] bg-gray-900 rounded-md p-[20px] flex flex-col gap-y-4 border border-gray-600 relative">
            <AddContactButton />

            <h2 className="font-bold text-center text-xl mb-4">Contatos</h2>
            <small className="text-center">Sua lista de contatos está vazia</small>
          </div>
        )}{' '}
        <CustomModal>
          {addContactModal ? (
            <AddContactForm />
          ) : deleteContactModal ? (
            <DeleteConfirm deleteType="contact" />
          ) : selectedContact ? (
            <UpdateContactForm />
          ) : (
            <></>
          )}
        </CustomModal>
      </MainContainer>
    </>
  );
};

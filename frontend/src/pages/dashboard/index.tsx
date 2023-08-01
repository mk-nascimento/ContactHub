import { useEffect } from 'react';

import { ContactCard } from '../../components/Contact';
import { ContactList } from '../../components/ContactsList';
import { ContactForm } from '../../components/Forms/ContactForm.component';
import { MainContainer } from '../../components/Main';
import { CustomModal } from '../../components/Modal';
import { Navbar } from '../../components/Navbar';
import { useContact } from '../../hooks/useContact';
import { Contact } from '../../interfaces/global.interfaces';

export const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard';
    return () => {
      document.title = 'Fullstack Challenge';
    };
  }, []);
  const { contacts, selectedContact } = useContact();

  const renderContacts = (contactsToRender: Contact[]) => contactsToRender.map((contact) => <ContactCard key={contact.id} contact={contact} />);

  return (
    <>
      <Navbar />
      <MainContainer>
        <ContactList>{renderContacts(contacts)}</ContactList>
        <CustomModal>{selectedContact ? <ContactForm /> : <></>}</CustomModal>
      </MainContainer>
    </>
  );
};

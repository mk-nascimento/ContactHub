import { useEffect, useMemo, useState } from 'react';
import { ContactDeleteModal } from 'src/components/ContactModal/Delete';
import { ContactCreateForm } from 'src/components/ContactModal/Form/Create';
import { ContactUpdateForm } from 'src/components/ContactModal/Form/Update';
import { ContactInfoModal } from 'src/components/ContactModal/Info';
import { TContactModalMode } from 'src/components/ContactModal/contactModal.interface';
import { ContactList } from 'src/components/ContactsList';
import { MainContainer } from 'src/components/Container/Main';
import { Modal } from 'src/components/Modal';
import { useContact } from 'src/hooks/useContact';

export const Homepage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<TContactModalMode>();
  const { createModalStates, highlightedStates } = useContact();
  const { '0': createModal, '1': setCreateModal } = createModalStates;
  const { '0': contact, '1': setContact } = highlightedStates;

  const handleModalMode = (mode: TContactModalMode) => setModalMode(mode);

  useEffect(() => {
    if (modalMode) setOpenModal(true);
  }, [modalMode]);

  useEffect(() => {
    if (contact) handleModalMode('show');
    else if (createModal) handleModalMode('create');
    else handleModalMode(undefined);
  }, [createModal, contact, setContact]);

  useEffect(() => {
    if (!openModal) {
      setContact(undefined);
      setCreateModal(false);
    }
  }, [openModal, setContact, setCreateModal]);

  const renderModalContent = useMemo(() => {
    switch (modalMode) {
      case 'show':
        return <ContactInfoModal handleModal={setModalMode} />;
      case 'update':
        return <ContactUpdateForm modalControl={() => setOpenModal(false)} />;
      case 'delete':
        return <ContactDeleteModal modalControl={() => setOpenModal(false)} />;
      case 'create':
        return <ContactCreateForm modalControl={() => setOpenModal(false)} />;
    }
  }, [modalMode]);

  return (
    <>
      <MainContainer>
        <ContactList />
      </MainContainer>
      <Modal statePair={[openModal, setOpenModal]}>{renderModalContent}</Modal>
    </>
  );
};

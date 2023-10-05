import { ContactList } from 'src/components/ContactsList';
import { MainContainer } from 'src/components/Container/Main';

export const Homepage = () => {
  return (
    <>
      <MainContainer>
        <ContactList />
      </MainContainer>
    </>
  );
};

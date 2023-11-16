import { useContext } from 'react';
import { ContactContext } from 'src/providers/ContactProvider';

export const useContact = () => useContext(ContactContext);

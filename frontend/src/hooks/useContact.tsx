import { useContext } from 'react';
import { ContactContext } from '../Providers/ContactProvider';

export const useContact = () => useContext(ContactContext);

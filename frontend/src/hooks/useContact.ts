import { useContext } from 'react';
import { ContactContext } from '../providers/ContactProvider';

export const useContact = () => useContext(ContactContext);

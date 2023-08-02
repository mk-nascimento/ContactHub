import { useContext } from 'react';
import { UserContext } from '../providers/User.provider';

export const useUser = () => useContext(UserContext);

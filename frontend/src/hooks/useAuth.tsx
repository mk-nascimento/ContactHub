import { useContext } from 'react';
import { AuthContext } from '../providers/Auth.provider';

export const useAuth = () => useContext(AuthContext);

import { useContext } from 'react';
import { AuthContext } from '../Providers/Auth.provider';

export const useAuth = () => useContext(AuthContext);

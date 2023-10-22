import { useContext } from 'react';
import { AuthContext } from 'src/providers/Auth.provider';

export const useAuth = () => useContext(AuthContext);

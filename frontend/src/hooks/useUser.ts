import { useContext } from 'react';
import { UserContext } from 'src/providers/User.provider';

export const useUser = () => useContext(UserContext);

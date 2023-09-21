import { DisconnectedContainer } from '../../components/Container/Disconnected';
import { LoginForm } from '../../components/Forms/Login';

export const Login = () => (
  <DisconnectedContainer>
    <LoginForm />
  </DisconnectedContainer>
);

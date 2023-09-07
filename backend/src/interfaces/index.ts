import { Request } from '@nestjs/common';
import { UserRole } from 'src/enums';

export interface ITokenUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface IReqWithUser extends Request {
  user: ITokenUser;
}

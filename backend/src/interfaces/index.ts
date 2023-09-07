import { Request } from '@nestjs/common';

export interface ITokenUser {
  id: string;
  email: string;
}

export interface IReqWithUser extends Request {
  user: ITokenUser;
}

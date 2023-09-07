import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(mail: string, pass: string) {
    const { id, email, password }: User = await this.usersService.findUniqueByEmail(mail);

    if (!id) return null;

    const passMatch = await compare(pass, password);
    if (passMatch) return { email };
  }

  async login(email: string) {
    const { id }: User = await this.usersService.findUniqueByEmail(email);

    return {
      token: this.jwtService.sign({ email }, { subject: id }),
    };
  }
}

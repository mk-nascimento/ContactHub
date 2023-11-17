import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UserRole } from 'src/enums';
import { ITokenUser } from 'src/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  private async checkCurrentPassword(current: string, email: string) {
    const { password: hash }: User = await this.usersRepo.findUniqueByEmail(email);
    const match = await compare(current, hash);

    if (!match) throw new BadRequestException('Incorrect current password. Please check and try again.');
  }

  private checkPermission(user: ITokenUser, user_id: string) {
    if (user.id !== user_id && user.role !== UserRole.Admin) throw new ForbiddenException('Insufficient Permission');
  }

  private async checkValidUser(id: string) {
    const user: User = await this.usersRepo.findUnique(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user: User = await this.usersRepo.findUniqueByEmail(createUserDto.email);
    if (user) throw new BadRequestException(`User already exists`);

    return await this.usersRepo.create(createUserDto);
  }

  async findMany(role: UserRole) {
    if (role !== UserRole.Admin) throw new ForbiddenException('Insufficient permission');

    return await this.usersRepo.findMany();
  }

  async findUnique(tokenUser: ITokenUser, id: string) {
    const user: User = await this.usersRepo.findUnique(id);
    if (!user) throw new NotFoundException(`User #: ${id} not found`);

    this.checkPermission(tokenUser, id);

    return user;
  }

  async findUniqueByEmail(email: string) {
    const user: User = await this.usersRepo.findUniqueByEmail(email);
    if (!user) throw new NotFoundException(`User @: ${email} not found`);

    return user;
  }

  async profile(id: string) {
    return await this.usersRepo.profile(id);
  }

  async update(tokenUser: ITokenUser, id: string, { current, ...data }: UpdateUserDto) {
    this.checkPermission(tokenUser, id);
    const { email } = await this.checkValidUser(id);

    if (data.password) await this.checkCurrentPassword(current, email);

    return await this.usersRepo.update(id, data);
  }

  async remove(tokenUser: ITokenUser, id: string) {
    this.checkPermission(tokenUser, id);
    await this.checkValidUser(id);

    const user: User = await this.usersRepo.findUnique(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);

    return await this.usersRepo.remove(id);
  }
}

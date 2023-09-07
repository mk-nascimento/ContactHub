import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRole } from 'src/enums';
import { ITokenUser } from 'src/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  private checkPermission(user: ITokenUser, user_id: string) {
    if (user.id !== user_id && user.role !== UserRole.Admin) throw new ForbiddenException('Insufficient Permission');
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

  async update(tokenUser: ITokenUser, id: string, updateUserDto: UpdateUserDto) {
    const user: User = await this.usersRepo.findUnique(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);

    this.checkPermission(tokenUser, id);

    return await this.usersRepo.update(id, updateUserDto);
  }

  async remove(tokenUser: ITokenUser, id: string) {
    const user: User = await this.usersRepo.findUnique(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);

    this.checkPermission(tokenUser, id);

    return await this.usersRepo.remove(id);
  }
}

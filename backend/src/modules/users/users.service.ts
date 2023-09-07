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

  private async checkPermission(tokenId: string, paramId: string) {
    const user: User = await this.usersRepo.findUnique(tokenId);

    if (user?.role !== UserRole.Admin && tokenId !== paramId) throw new ForbiddenException('Insufficient permission');
  }

  async create(createUserDto: CreateUserDto) {
    const user: User = await this.usersRepo.findUniqueByEmail(createUserDto.email);
    if (user) throw new BadRequestException(`User already exists`);

    return await this.usersRepo.create(createUserDto);
  }

  async findMany(tokenUser: ITokenUser) {
    const user: User = await this.usersRepo.findUnique(tokenUser.id);

    const admin: boolean = user?.role === UserRole.Admin;
    if (!admin) throw new ForbiddenException('Insufficient permission');

    return await this.usersRepo.findMany();
  }

  async findUnique(tokenUser: ITokenUser, id: string) {
    const user: User = await this.usersRepo.findUnique(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);

    await this.checkPermission(tokenUser.id, id);

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

    await this.checkPermission(tokenUser.id, id);

    return await this.usersRepo.update(id, updateUserDto);
  }

  async remove(tokenUser: ITokenUser, id: string) {
    const user: User = await this.usersRepo.findUnique(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);

    await this.checkPermission(tokenUser.id, id);

    return await this.usersRepo.remove(id);
  }
}

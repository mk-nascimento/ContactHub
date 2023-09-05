import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepo.create(createUserDto);
  }

  async findMany() {
    return await this.usersRepo.findMany();
  }

  async findUnique(id: string) {
    const user: User = await this.usersRepo.findUnique(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);

    return user;
  }

  async findUniqueByEmail(email: string) {
    const user: User = await this.usersRepo.findUniqueByEmail(email);
    if (!user) throw new NotFoundException(`User @${email} not found`);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user: User = await this.usersRepo.findUnique(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);

    return await this.usersRepo.update(id, updateUserDto);
  }

  async remove(id: string) {
    const user: User = await this.usersRepo.findUnique(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);

    return await this.usersRepo.remove(id);
  }
}

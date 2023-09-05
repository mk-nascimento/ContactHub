import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { UsersRepository } from '../users.repository';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const instance = new User();
    Object.assign(instance, data);

    const user: User = await this.prisma.user.create({ data: instance });

    return plainToInstance(User, user);
  }

  async findMany(): Promise<User[]> {
    const users: User[] = await this.prisma.user.findMany();

    return plainToInstance(User, users);
  }

  async findUnique(id: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({ where: { id } });

    return plainToInstance(User, user);
  }

  async findUniqueByEmail(email: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({ where: { email } });

    return plainToInstance(User, user);
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user: User = await this.prisma.user.update({ where: { id }, data });

    return plainToInstance(User, user);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}

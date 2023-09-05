import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export abstract class UsersRepository {
  abstract create(data: CreateUserDto): Promise<User>;
  abstract findMany(): Promise<User[]>;
  abstract findUnique(id: string): Promise<User | undefined>;
  abstract findUniqueByEmail(email: string): Promise<User | undefined>;
  abstract update(id: string, data: UpdateUserDto): Promise<User>;
  abstract remove(id: string): Promise<void>;
}

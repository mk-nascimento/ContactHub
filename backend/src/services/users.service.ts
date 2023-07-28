import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { TUserPayload } from '../interfaces/users.interface';

export const createUserService = async (userPayload: TUserPayload): Promise<any> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  return Promise;
};

export const listUsersService = async (): Promise<any> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  return Promise;
};

export const updateUsersService = async (userId: string, userPayload: TUserPayload): Promise<any> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  return Promise;
};

export const deleteUserService = async (userId: string): Promise<any> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  return Promise;
};

import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { Contact } from '../entities/contacts.entity';
import { TUserContactList } from '../interfaces/contacts.interface';
import { TUserListResponse, TUserPayload, TUserProfile, TUserResponse, TUserUpdatePayload } from '../interfaces/users.interface';
import { contactSchemas as cS, userSchemas as uS } from '../schemas';

export const createUserService = async (userPayload: TUserPayload): Promise<TUserResponse> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const userInstance: User = userRepo.create(userPayload);
  await userRepo.save(userInstance);

  const user: TUserResponse = uS.userResponse.parse(userInstance);

  return user;
};

export const listUsersService = async (): Promise<TUserListResponse> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const usersInstance: User[] = await userRepo.find({ order: { full_name: 'ASC' } });
  const users: TUserListResponse = uS.usersList.parse(usersInstance);

  return users;
};

export const retrieveUserService = async (userId: string): Promise<TUserResponse> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const id: string = userId;
  const userInstance: User = (await userRepo.findOneBy({ id }))!;

  const user: TUserResponse = uS.userResponse.parse(userInstance);

  return user;
};

export const retrieveProfileService = async (userId: string): Promise<TUserProfile> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const contactRepo: Repository<Contact> = AppDataSource.getRepository(Contact);

  const id: string = userId;
  const userInstance: User = (await userRepo.findOneBy({ id }))!;
  const contactsInstance: Contact[] = (await contactRepo.find({ where: { user: { id } } }))!;

  const contacts: TUserContactList = cS.userContactList.parse(contactsInstance);
  const user: TUserResponse = uS.userResponse.parse(userInstance);

  return { ...user, contacts };
};

export const updateUsersService = async (userId: string, userPayload: TUserUpdatePayload): Promise<TUserResponse> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const id: string = userId;
  const dbUser: User = (await userRepo.findOneBy({ id }))!;
  const userInstance: User = userRepo.create({ ...dbUser, ...userPayload });
  await userRepo.save(userInstance);

  const user: TUserResponse = uS.userResponse.parse(userInstance);

  return user;
};

export const deleteUserService = async (userId: string): Promise<void> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const id: string = userId;
  const user: User = (await userRepo.findOneBy({ id }))!;

  await userRepo.remove(user);
};

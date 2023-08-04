import { compare } from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { sign } from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { AppError } from '../error';
import { TLoginPayload, TToken } from '../interfaces/auth.interface';

/**
 * Service function to create a JSON Web Token (JWT) for a user based on their login credentials.
 *
 * @param {TLoginPayload} payload - The login payload containing the user's email and password.
 * @returns {Promise<TToken>} - A promise that resolves to an object containing the JWT token.
 * @throws {AppError} - Throws an error with status 401 if the user's credentials are invalid.
 */
export const createTokenService = async ({ email, password }: TLoginPayload): Promise<TToken> => {
  const SECRET_KEY: string = String(process.env.SECRET_KEY) || String(randomUUID() + randomUUID());
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepo.findOneBy({ email });
  if (!user) throw new AppError('Invalid credentials', StatusCodes.UNAUTHORIZED);

  const validPassword: boolean = await compare(password, user.password);
  if (!validPassword) throw new AppError('Invalid credentials', StatusCodes.UNAUTHORIZED);

  const token: string = sign({ email }, SECRET_KEY, { expiresIn: '12h', subject: user.id });

  return { token };
};

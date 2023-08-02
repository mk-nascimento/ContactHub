import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TUserListResponse, TUserProfile, TUserResponse } from '../interfaces/users.interface';
import { usersServices as uServ } from '../services';

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
  const user: TUserResponse = await uServ.createUserService(req.body);

  return res.status(StatusCodes.CREATED).json(user);
};

export const listUsersController = async (_: Request, res: Response): Promise<Response> => {
  const users: TUserListResponse = await uServ.listUsersService();

  return res.json(users);
};

export const retrieveUserController = async (_: Request, res: Response): Promise<Response> => {
  const id: string = res.locals.paramsId;
  const user: TUserResponse = await uServ.retrieveUserService(id);

  return res.json(user);
};

export const retrieveProfileController = async (_: Request, res: Response): Promise<Response> => {
  const id: string = res.locals.loggedId;
  const user: TUserProfile = await uServ.retrieveProfileService(id);

  return res.json(user);
};

export const updateUserController = async (req: Request, res: Response): Promise<Response> => {
  const id: string = res.locals.paramsId;

  const user: TUserResponse = await uServ.updateUsersService(id, req.body);

  return res.json(user);
};

export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
  const id: string = res.locals.paramsId;

  await uServ.deleteUserService(id);

  return res.status(StatusCodes.NO_CONTENT).send();
};

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
  return res.status(StatusCodes.CREATED).json('createUserController');
};

export const listUsersController = async (req: Request, res: Response): Promise<Response> => {
  return res.json('ListUsersController');
};

export const updateUserController = async (req: Request, res: Response): Promise<Response> => {
  return res.json('updateUserController');
};

export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
  return res.status(StatusCodes.NO_CONTENT);
};

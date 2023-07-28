import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const createContactsController = async (req: Request, res: Response): Promise<Response> => {
  return res.status(StatusCodes.CREATED).json('createUserController');
};

export const listContactsController = async (req: Request, res: Response): Promise<Response> => {
  return res.json('ListUsersController');
};

export const updateContactsController = async (req: Request, res: Response): Promise<Response> => {
  return res.json('updateUserController');
};

export const deleteContactsController = async (req: Request, res: Response): Promise<Response> => {
  return res.status(StatusCodes.NO_CONTENT);
};

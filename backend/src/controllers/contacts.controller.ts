import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TContact, TContactList, TUserContactList } from '../interfaces/contacts.interface';
import { contactsServices as cServ } from '../services';

export const createContactsController = async (req: Request, res: Response): Promise<Response> => {
  const id: string = String(res.locals.loggedId);
  const contact: TContact = await cServ.createContactService(id, req.body);

  return res.status(StatusCodes.CREATED).json(contact);
};

export const listContactsController = async (req: Request, res: Response): Promise<Response> => {
  const id: string = res.locals.loggedId;
  const contacts: TContactList | TUserContactList = await cServ.listContactsService(id);

  return res.json(contacts);
};

export const retrieveContactController = async (req: Request, res: Response): Promise<Response> => {
  const id: string = String(res.locals.paramsId);
  const contact: TContact = await cServ.retrieveContactService(id);

  return res.json(contact);
};

export const updateContactsController = async (req: Request, res: Response): Promise<Response> => {
  const id: string = String(res.locals.paramsId);
  const contact: TContact = await cServ.updateContactService(id, req.body);

  return res.json(contact);
};

export const deleteContactsController = async (_: Request, res: Response): Promise<Response> => {
  const id: string = String(res.locals.paramsId);
  await cServ.deleteContactService(id);

  return res.status(StatusCodes.NO_CONTENT).send();
};

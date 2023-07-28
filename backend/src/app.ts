import 'express-async-errors';
import 'reflect-metadata';

import express from 'express';

import { handleError } from './middlewares';
import { contactsRouter, usersRouter } from './routers';

const app: express.Application = express();
app.use(express.json());

app.use('/contacts', contactsRouter);
app.use('/users', usersRouter);

app.use(handleError.default);

export default app;

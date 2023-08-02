import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';

import cors from 'cors';
import express from 'express';

import { handleError } from './middlewares';
import { authRouter, contactsRouter, usersRouter } from './routers';

const app: express.Application = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/auth', authRouter);
app.use('/contacts', contactsRouter);
app.use('/users', usersRouter);

app.use(handleError.default);

export default app;

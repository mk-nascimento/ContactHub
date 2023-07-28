import express, { Application } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import { handleError } from './middlewares';
import { usersRouter } from './routers';

const app: Application = express();
app.use(express.json());

app.use('/users', usersRouter);

app.use(handleError.default);

export default app;

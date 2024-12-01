import express from 'express';
import cors from 'cors';
import { env } from './utils/env.js';
// import { logger } from './middlewares/logger.js';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use('/uploads', express.static(UPLOAD_DIR));
  // app.use(logger);

  // Якщо прийде будь-який запит, що починається з /contacts, шукай обробник цього запиту у об'єкті contactsRouter
  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);

  app.use(notFoundHandler); // for when address is not found; should be placed right after routes

  app.use(errorHandler);

  const port = Number(env('PORT', 3000));
  app.listen(port, () => console.log(`Server is running on PORT ${port}`));
};

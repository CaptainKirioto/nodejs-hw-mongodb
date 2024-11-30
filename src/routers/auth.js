import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { authRegisterSchema, authLoginSchema } from '../validation/auth.js';
import * as authControllers from '../controllers/auth.js';
import { requestResetEmailSchema } from '../validation/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrlWrapper(authControllers.registerController),
);

authRouter.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(authControllers.loginController),
);

authRouter.post(
  '/refresh',
  ctrlWrapper(authControllers.refreshSessionController),
);

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(authControllers.requestResetEmailController),
);

authRouter.post('/logout', ctrlWrapper(authControllers.logoutController));

export default authRouter;

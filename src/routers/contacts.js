import { Router } from 'express';
import * as contactsControllers from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { contactsAddSchema } from '../validation/contacts.js';
import { contactsUpdateSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(contactsControllers.getContactsController));

contactsRouter.get(
  '/:id',
  isValidId,
  ctrlWrapper(contactsControllers.getContactByIdController),
);

contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(contactsAddSchema),
  ctrlWrapper(contactsControllers.addContactController),
);

contactsRouter.patch(
  '/:id',
  isValidId,
  upload.single('photo'),
  validateBody(contactsUpdateSchema),
  ctrlWrapper(contactsControllers.patchContactController),
);

contactsRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(contactsControllers.deleteContactController),
);

export default contactsRouter;

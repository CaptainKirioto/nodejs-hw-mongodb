import * as contactServices from '../services/contacts.js';
import createHttpError from 'http-errors';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
// import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
// import { env } from '../utils/env.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const { _id: userId } = req.user;
  filter.userId = userId;

  const data = await contactServices.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const data = await contactServices.getContactById(id, userId);

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const photo = req.file;
  let photoUrl = null;

  if (photo) {
    photoUrl = await saveFileToCloudinary(photo);
  }

  const data = await contactServices.addContact({
    ...req.body,
    userId,
    photo: photoUrl,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id: _id } = req.params;
  const userId = req.user._id;
  const photo = req.file;

  let photoUrl;
  if (photo) {
    photoUrl = await saveFileToCloudinary(photo);
  }

  // Feature flag
  // if (photo) {
  //   if (env('ENABLE_CLOUDINARY') === 'true') {
  //     photoUrl = await saveFileToCloudinary(photo);
  //   } else {
  //     photoUrl = await saveFileToUploadDir(photo);
  //   }
  // }

  const updateData = {
    ...req.body,
    photo: photoUrl,
  };

  const data = await contactServices.patchContact({
    _id,
    userId,
    payload: updateData,
  });
  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: data.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id: _id } = req.params;
  const userId = req.user._id;

  const data = await contactServices.deleteContact({ _id, userId });

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};

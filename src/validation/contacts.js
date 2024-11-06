import Joi from 'joi';
import { typeList } from '../constants/contacts.js';

export const contactsAddSchema = Joi.object({
  name: Joi.string().required().min(3).max(20).messages({
    'any.required': 'you missed the name',
  }),
  phoneNumber: Joi.string().required().min(3).max(20).messages({
    'any.required': 'you missed the phone number',
  }),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.string().min(3).max(20),
  contactType: Joi.string()
    .valid(...typeList)
    .required()
    .messages({
      'any.required': 'you missed the contact type',
    }),
});

export const contactsUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.string().min(3).max(20),
  contactType: Joi.string().valid(...typeList),
});

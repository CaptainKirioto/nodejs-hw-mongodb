import { Schema, model } from 'mongoose';
import { typeList } from '../../constants/contacts.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: String,
    isFavourite: {
      type: String,
      default: false,
    },
    contactType: {
      type: String,
      enum: typeList,
      required: true,
      default: 'personal',
    },
  },
  {
    timestamps: true,
  },
);

// contactSchema.post('save', (error, data, next) => {
//   error.status = 400;
//   next();
// });

// contactSchema.post('findOneAndUpdate', (error, data, next) => {
//   error.status = 400;
//   next();
// });

const ContactCollection = model('contact', contactSchema);
export default ContactCollection;

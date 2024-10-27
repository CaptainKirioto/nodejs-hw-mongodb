import ContactCollection from '../db/models/Contact.js';

export const getContacts = () => ContactCollection.find();

// export const getContactById = (id) => ContactCollection.findById(id);

export const getContactById = async (contactId) => {
  try {
    return await ContactCollection.findById(contactId);
  } catch (error) {
    console.log(error);
    return null;
  }
};

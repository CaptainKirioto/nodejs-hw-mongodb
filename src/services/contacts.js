import ContactCollection from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { sortOrderList } from '../constants/sortOrderList.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = sortOrderList[0],
  filter = {},
}) => {
  {
    const skip = (page - 1) * perPage;
    const query = ContactCollection.find(); //find(filter)

    if (filter.type) {
      query.where('contactType').equals(filter.type);
    }
    if (filter.isFavourite) {
      query.where('isFavourite').equals(filter.isFavourite);
    }
    if (filter.userId) {
      query.where('userId').equals(filter.userId);
    }

    const totalItems = await ContactCollection.find()
      .merge(query)
      .countDocuments();
    const data = await query
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder });
    const paginationData = calculatePaginationData({
      page,
      perPage,
      totalItems,
    });

    return {
      data,
      ...paginationData,
    };
  }
};

// export const getContactById =  (id) =>
//    ContactCollection.findById(id);

export const getContactById = async (contactId, userId) => {
  try {
    return await ContactCollection.findOne({ _id: contactId, userId });
  } catch (error) {
    return null;
  }
};

// export const getContactById = async (contactId) => {
//   try {
//     return await ContactCollection.findById(contactId);
//   } catch (error) {
//     return null;
//   }
// };

//
export const addContact = (payload) => {
  return ContactCollection.create(payload);
};

export const patchContact = async ({ _id, userId, payload, options = {} }) => {
  const rawResult = await ContactCollection.findOneAndUpdate(
    { _id, userId },
    payload,
    {
      ...options,
      new: true,
      includeResultMetadata: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteContact = (_id, userId) => {
  return ContactCollection.findOneAndDelete(_id, userId);
};

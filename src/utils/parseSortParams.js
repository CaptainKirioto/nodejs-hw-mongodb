import { sortByList } from '../db/models/Contact.js';
import { sortOrderList } from '../constants/sortOrderList.js';
// const sortOrderList = ['asc', 'desc'];

export const parseSortParams = ({ sortBy, sortOrder }) => {
  const parsedSortBy = sortByList.includes(sortBy) ? sortBy : '_id';
  const parsedSortOrder = sortOrderList.includes(sortOrder)
    ? sortOrder
    : sortOrderList[0];
  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};

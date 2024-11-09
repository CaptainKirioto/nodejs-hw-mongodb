import { typeList } from '../constants/contacts.js';

const parseIsFavourite = (isFavourite) => {
  if (isFavourite === 'true') return true;
  if (isFavourite === false) return false;
  return undefined;
};

const parseType = (type) => {
  if (typeof type !== 'string') return;
  const parsedType = typeList.includes(type);
  if (parsedType) return type;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;
  const parsedType = parseType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);
  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};

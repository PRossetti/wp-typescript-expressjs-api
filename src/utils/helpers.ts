export const clearUndefines = (obj: object): object => {
  const newObj = { ...obj };
  for (const key in newObj) {
    if (newObj[key] === undefined) delete newObj[key];
  }

  return newObj;
};

export const isEmptyArrayOrObject = (value) => {
  return (Array.isArray(value) && !value.length) || (typeof value === 'object' && !Object.entries(value).length);
};

export const isJunk = (value) => {
  return value === null || value === undefined || value === '' || isEmptyArrayOrObject(value);
};

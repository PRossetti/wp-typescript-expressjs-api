export const clearUndefines = (obj: object): object => {
  const newObj = { ...obj };
  for (const key in newObj) {
    if (newObj[key] === undefined) delete newObj[key];
  }

  return newObj;
};

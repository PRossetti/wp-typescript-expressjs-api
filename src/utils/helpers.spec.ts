import { clearUndefines, isEmptyArrayOrObject, isJunk } from './helpers';

describe('::: Helpers test suite :::', () => {
  it('clearUndefines should return a new copy of parameter object without keys holding undefined values', () => {
    const artist = {
      id: '111123',
      name: 'Lil Silva',
      spotifyId: '2Kv0ApBohrL213X9avMrEn',
      genres: ['bass music', 'future garage', 'uk funky', 'vogue'],
      age: undefined,
    };

    const cleanedArtist: Object = clearUndefines(artist);
    expect(artist.hasOwnProperty('age')).toEqual(true);
    expect(cleanedArtist.hasOwnProperty('age')).toEqual(false);
  });

  it('isEmptyArrayOrObject should return true for an empty array or object', () => {
    const emptyArray = [];
    const emptyObject = {};
    expect(isEmptyArrayOrObject(emptyArray)).toEqual(true);
    expect(isEmptyArrayOrObject(emptyObject)).toEqual(true);
  });

  it('isEmptyArrayOrObject should return false for non empty array or object', () => {
    const someArray = [1];
    const someObject = { test: true };
    expect(isEmptyArrayOrObject(someArray)).toEqual(false);
    expect(isEmptyArrayOrObject(someObject)).toEqual(false);
  });

  it('isJunk should return true for null, undefined and empty string, array or object', () => {
    expect(isJunk(null)).toEqual(true);
    expect(isJunk(undefined)).toEqual(true);
    expect(isJunk('')).toEqual(true);
    expect(isJunk([])).toEqual(true);
    expect(isJunk({})).toEqual(true);
  });

  it('isJunk should return false for truthy values and non empty arrays or objects', () => {
    expect(isJunk(1)).toEqual(false);
    expect(isJunk('a')).toEqual(false);
    expect(isJunk([1])).toEqual(false);
    expect(isJunk({ test: true })).toEqual(false);
  });
});

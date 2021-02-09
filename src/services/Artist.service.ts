import DataBaseService from './DataBase.service';

export default class ArtistService {
  private static collecionName = 'artist';

  static getOne(query: object) {
    return DataBaseService.get(this.collecionName, query);
  }

  static getMany(query = {}) {
    const cursor = DataBaseService.getMany(this.collecionName, query);
    return cursor.toArray();
  }

  static insert(body: object) {
    return DataBaseService.insert(this.collecionName, body);
  }
}

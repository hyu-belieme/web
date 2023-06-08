import { List } from 'immutable';

import type Authority from '@common/models/Authority';
import University from '@common/models/University';

class User {
  public id: string;

  public university: University;

  public studentId: string;

  public name: string;

  public entranceYear?: number;

  public authorities: List<Authority>;

  constructor(oth: User) {
    this.id = oth.id;
    this.university = new University(oth.university);
    this.studentId = oth.studentId;
    this.name = oth.name;
    this.entranceYear = oth.entranceYear;
    this.authorities = List(oth.authorities);
  }
}

export default User;

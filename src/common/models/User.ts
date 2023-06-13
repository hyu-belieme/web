import { List } from 'immutable';

import Authority from '@common/models/Authority';
import type { IAuthority } from '@common/models/Authority';
import University, { type IUniversity } from '@common/models/University';

export interface IUser {
  id: string;
  university: IUniversity;
  studentId: string;
  name: string;
  entranceYear?: number;
  authorities: List<IAuthority>;
}

export class User {
  public static NIL: User = new User({
    id: '',
    university: University.NIL,
    studentId: '',
    name: '',
    authorities: List<IAuthority>([]),
  });

  public id: string;

  public university: University;

  public studentId: string;

  public name: string;

  public entranceYear?: number;

  public authorities: List<Authority>;

  constructor(oth: IUser) {
    this.id = oth.id;
    this.university = new University(oth.university);
    this.studentId = oth.studentId;
    this.name = oth.name;
    this.entranceYear = oth.entranceYear;
    this.authorities = List<Authority>(oth.authorities.map((auth) => new Authority(auth)));
  }

  public equals(oth: any): boolean {
    if (oth === undefined || oth === null) return false;
    if (!(oth instanceof User)) return false;
    return (
      this.id === oth.id &&
      this.university.equals(oth.university) &&
      this.studentId === oth.studentId &&
      this.name === oth.name &&
      this.entranceYear === oth.entranceYear &&
      this.authorities.reduce(
        (acc, val, idx) => acc && val === oth.authorities.get(idx),
        this.authorities.size === oth.authorities.size
      )
    );
  }
}

export default User;

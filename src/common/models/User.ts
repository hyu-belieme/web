import { List } from 'immutable';

import Authority from '@common/models/Authority';
import type { IAuthority } from '@common/models/Authority';
import BaseVo from '@common/models/BaseVo';
import University, { type IUniversity } from '@common/models/University';

export interface IUser {
  id: string;
  university: IUniversity;
  studentId: string;
  name: string;
  entranceYear?: number;
  authorities: List<IAuthority>;
}

export class User extends BaseVo {
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
    super();
    this.id = oth.id;
    this.university = new University(oth.university);
    this.studentId = oth.studentId;
    this.name = oth.name;
    this.entranceYear = oth.entranceYear;
    this.authorities = List<Authority>(oth.authorities.map((auth) => new Authority(auth)));
  }

  public compare(oth: User): number {
    const cmpName = this.name.localeCompare(oth.name);
    if (cmpName === 0) {
      return this.id.localeCompare(oth.id);
    }
    return cmpName;
  }

  public getPermission(deptId: string): string {
    const auth = this.authorities.find((e) => e.department.id === deptId);
    console.log('auth', auth?.permission);
    return auth ? auth.permission : 'NIL';
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

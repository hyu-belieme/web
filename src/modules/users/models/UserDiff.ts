import BaseVo from '@common/models/BaseVo';
import type { IDepartment } from '@common/models/Department';
import Department from '@common/models/Department';
import User, { type IUser } from '@common/models/User';
import type AuthorityPermission from '@common/models/types/AuthorityPermission';

import type { UserDiffType } from '@^users/models/types/UserDiffType';

export interface IUserDiff {
  user: IUser;
  dept: IDepartment;
  prevState: AuthorityPermission;
  curState: AuthorityPermission;
}

export class UserDiff extends BaseVo {
  public static NIL: UserDiff = new UserDiff({
    user: User.NIL,
    dept: Department.NIL,
    prevState: 'NIL',
    curState: 'NIL',
  });

  public user: User;

  public dept: Department;

  public prevState: AuthorityPermission;

  public curState: AuthorityPermission;

  constructor(oth: IUserDiff) {
    super();
    this.user = new User(oth.user);
    this.dept = new Department(oth.dept);
    this.prevState = oth.prevState;
    this.curState = oth.curState;
  }

  public diffType(): UserDiffType {
    if (this.curState === 'NIL' || this.prevState === 'NIL') return 'NIL';
    if (this.curState === 'BANNED') return 'DELETED';
    if (this.prevState === 'BANNED') return 'ADDED';
    return 'MODIFIED';
  }

  public equals(oth: any): boolean {
    if (oth === undefined || oth === null) return false;
    if (!(oth instanceof UserDiff)) return false;
    return (
      this.user.equals(oth.user) &&
      this.dept.equals(oth.dept) &&
      this.prevState === oth.prevState &&
      this.curState === oth.curState
    );
  }
}

export default UserDiff;

import Department, { type IDepartment } from '@common/models/Department';
import type AuthorityPermission from '@common/models/types/AuthorityPermission';

export interface IAuthority {
  department: IDepartment;

  permission: AuthorityPermission;
}

export class Authority {
  public department: Department;

  public permission: AuthorityPermission;

  constructor(oth: IAuthority) {
    this.department = new Department(oth.department);
    this.permission = oth.permission;
  }

  public equals(oth: any): boolean {
    if (oth === undefined || oth === null) return false;
    if (!(oth instanceof Authority)) return false;
    return this.department.equals(oth.department) && this.permission === oth.permission;
  }
}

export default Authority;

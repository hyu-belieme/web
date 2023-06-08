import Department from '@common/models/Department';
import type AuthorityPermission from '@common/models/types/AuthorityPermission';

class Authority {
  public department: Department;

  public permission: AuthorityPermission;

  constructor(oth: Authority) {
    this.department = new Department(oth.department);
    this.permission = oth.permission;
  }
}

export default Authority;

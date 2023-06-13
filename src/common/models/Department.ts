import DepartmentInfoOnly from '@common/models/DepartmentInfoOnly';
import type { IDepartmentInfoOnly } from '@common/models/DepartmentInfoOnly';
import University, { type IUniversity } from '@common/models/University';

export interface IDepartment extends IDepartmentInfoOnly {
  university: IUniversity;
}
export class Department extends DepartmentInfoOnly {
  public static NIL: Department = new Department({
    ...DepartmentInfoOnly.NIL,
    university: University.NIL,
  });

  public university: University;

  constructor(oth: IDepartment) {
    super(oth);
    this.university = new University(oth.university);
  }

  public equals(oth: any): boolean {
    if (oth === undefined || oth === null) return false;
    if (!(oth instanceof Department)) return false;
    return super.equals(oth) && this.university.equals(oth.university);
  }
}

export default Department;

import DepartmentInfoOnly from '@common/models/DepartmentInfoOnly';
import University from '@common/models/University';

class Department extends DepartmentInfoOnly {
  public university: University;

  constructor(oth: Department) {
    super(oth);
    this.university = new University(oth.university);
  }
}

export default Department;

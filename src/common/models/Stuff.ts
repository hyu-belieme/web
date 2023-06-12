import DepartmentInfoOnly from '@common/models/DepartmentInfoOnly';
import StuffInfoOnly from '@common/models/StuffInfoOnly';
import University from '@common/models/University';

class Stuff extends StuffInfoOnly {
  public static NIL: Stuff = {
    ...StuffInfoOnly.NIL,
    university: University.NIL,
    department: DepartmentInfoOnly.NIL,
    amount: 0,
    count: 0,
  };

  public university: University;

  public department: DepartmentInfoOnly;

  public amount: number;

  public count: number;

  constructor(oth: Stuff) {
    super(oth);
    this.university = new University(oth.university);
    this.department = new DepartmentInfoOnly(oth.department);
    this.amount = oth.amount;
    this.count = oth.count;
  }
}

export default Stuff;

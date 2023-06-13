import DepartmentInfoOnly from '@common/models/DepartmentInfoOnly';
import StuffInfoOnly, { type IStuffInfoOnly } from '@common/models/StuffInfoOnly';
import University from '@common/models/University';

export interface IStuff extends IStuffInfoOnly {
  university: University;
  department: DepartmentInfoOnly;
  amount: number;
  count: number;
}

export class Stuff extends StuffInfoOnly {
  public static NIL: Stuff = new Stuff({
    ...StuffInfoOnly.NIL,
    university: University.NIL,
    department: DepartmentInfoOnly.NIL,
    amount: 0,
    count: 0,
  });

  public university: University;

  public department: DepartmentInfoOnly;

  public amount: number;

  public count: number;

  constructor(oth: IStuff) {
    super(oth);
    this.university = new University(oth.university);
    this.department = new DepartmentInfoOnly(oth.department);
    this.amount = oth.amount;
    this.count = oth.count;
  }

  public equals(oth: any): boolean {
    if (oth === undefined || oth === null) return false;
    if (!(oth instanceof Stuff)) return false;
    return (
      super.equals(oth) &&
      this.university.equals(oth.university) &&
      this.department.equals(oth.department) &&
      this.amount === oth.amount &&
      this.count === oth.count
    );
  }
}

export default Stuff;

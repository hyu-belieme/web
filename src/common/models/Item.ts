import DepartmentInfoOnly from '@common/models/DepartmentInfoOnly';
import ItemInfoOnly, { type IItemInfoOnly } from '@common/models/ItemInfoOnly';
import StuffInfoOnly from '@common/models/StuffInfoOnly';
import University from '@common/models/University';

export interface IItem extends IItemInfoOnly {
  university: University;
  department: DepartmentInfoOnly;
  stuff: StuffInfoOnly;
}

export class Item extends ItemInfoOnly {
  public static NIL: Item = new Item({
    ...ItemInfoOnly.NIL,
    university: University.NIL,
    department: DepartmentInfoOnly.NIL,
    stuff: StuffInfoOnly.NIL,
  });

  public university: University;

  public department: DepartmentInfoOnly;

  public stuff: StuffInfoOnly;

  constructor(oth: IItem) {
    super(oth);
    this.university = new University(oth.university);
    this.department = new DepartmentInfoOnly(oth.department);
    this.stuff = new StuffInfoOnly(oth.stuff);
  }

  public equals(oth: any): boolean {
    if (oth === undefined || oth === null) return false;
    if (!(oth instanceof Item)) return false;
    return (
      super.equals(oth) &&
      this.university.equals(oth.university) &&
      this.department.equals(oth.department) &&
      this.stuff.equals(oth.stuff)
    );
  }
}

export default Item;

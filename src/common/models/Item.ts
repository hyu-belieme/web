import DepartmentInfoOnly from '@common/models/DepartmentInfoOnly';
import ItemInfoOnly from '@common/models/ItemInfoOnly';
import StuffInfoOnly from '@common/models/StuffInfoOnly';
import University from '@common/models/University';

class Item extends ItemInfoOnly {
  public static NIL: Item = {
    ...ItemInfoOnly.NIL,
    university: University.NIL,
    department: DepartmentInfoOnly.NIL,
    stuff: StuffInfoOnly.NIL,
  };

  public university: University;

  public department: DepartmentInfoOnly;

  public stuff: StuffInfoOnly;

  constructor(oth: Item) {
    super(oth);
    this.university = new University(oth.university);
    this.department = new DepartmentInfoOnly(oth.department);
    this.stuff = new StuffInfoOnly(oth.stuff);
  }
}

export default Item;

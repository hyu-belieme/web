import DepartmentInfoOnly from '@common/models/DepartmentInfoOnly';
import HistoryInfoOnly, { type IHistoryInfoOnly } from '@common/models/HistoryInfoOnly';
import ItemInfoOnly from '@common/models/ItemInfoOnly';
import StuffInfoOnly from '@common/models/StuffInfoOnly';
import University from '@common/models/University';

export interface IHistory extends IHistoryInfoOnly {
  university: University;
  department: DepartmentInfoOnly;
  stuff: StuffInfoOnly;
  item: ItemInfoOnly;
}
export class History extends HistoryInfoOnly {
  public static NIL: History = new History({
    ...HistoryInfoOnly.NIL,
    university: University.NIL,
    department: DepartmentInfoOnly.NIL,
    stuff: StuffInfoOnly.NIL,
    item: ItemInfoOnly.NIL,
  });

  public university: University;

  public department: DepartmentInfoOnly;

  public stuff: StuffInfoOnly;

  public item: ItemInfoOnly;

  constructor(oth: IHistory) {
    super(oth);
    this.university = new University(oth.university);
    this.department = new DepartmentInfoOnly(oth.department);
    this.stuff = new StuffInfoOnly(oth.stuff);
    this.item = new ItemInfoOnly(oth.item);
  }

  public equals(oth: any): boolean {
    if (oth === undefined || oth === null) return false;
    if (!(oth instanceof History)) return false;
    return (
      super.equals(oth) &&
      this.university.equals(oth.university) &&
      this.department.equals(oth.department) &&
      this.stuff.equals(oth.stuff) &&
      this.item.equals(oth.item)
    );
  }
}

export default History;

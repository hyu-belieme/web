import DepartmentInfoOnly from '@common/models/DepartmentInfoOnly';
import HistoryInfoOnly from '@common/models/HistoryInfoOnly';
import ItemInfoOnly from '@common/models/ItemInfoOnly';
import StuffInfoOnly from '@common/models/StuffInfoOnly';
import University from '@common/models/University';

class History extends HistoryInfoOnly {
  public university: University;

  public department: DepartmentInfoOnly;

  public stuff: StuffInfoOnly;

  public item: ItemInfoOnly;

  constructor(oth: History) {
    super(oth);
    this.university = new University(oth.university);
    this.department = new DepartmentInfoOnly(oth.department);
    this.stuff = new StuffInfoOnly(oth.stuff);
    this.item = new ItemInfoOnly(oth.item);
  }
}

export default History;

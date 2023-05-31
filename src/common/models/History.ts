import HistoryInfoOnly from '@common/models/HistoryInfoOnly';
import Item from '@common/models/Item';

class History extends HistoryInfoOnly {
  public item: Item;

  constructor(oth: History) {
    super(oth);
    this.item = new Item(oth.item);
  }
}

export default History;

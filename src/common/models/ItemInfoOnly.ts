import HistoryInfoOnly from '@common/models/HistoryInfoOnly';
import type { ItemStatus } from '@common/models/types/ItemStatus';

class ItemInfoOnly {
  public id: string;

  public num: number;

  public status: ItemStatus;

  public lastHistory: HistoryInfoOnly | null;

  constructor(oth: ItemInfoOnly) {
    this.id = oth.id;
    this.num = oth.num;
    this.status = oth.status;
    this.lastHistory = oth.lastHistory ? new HistoryInfoOnly(oth.lastHistory) : null;
  }
}

export default ItemInfoOnly;

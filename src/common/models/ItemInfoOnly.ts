import BaseVo from '@common/models/BaseVo';
import HistoryInfoOnly, { type IHistoryInfoOnly } from '@common/models/HistoryInfoOnly';
import type ItemStatus from '@common/models/types/ItemStatus';

export interface IItemInfoOnly {
  id: string;
  num: number;
  status: ItemStatus;
  lastHistory: IHistoryInfoOnly | null;
}

export class ItemInfoOnly extends BaseVo {
  public static NIL: ItemInfoOnly = new ItemInfoOnly({
    id: '',
    num: 0,
    status: 'REQUESTED',
    lastHistory: null,
  });

  public id: string;

  public num: number;

  public status: ItemStatus;

  public lastHistory: HistoryInfoOnly | null;

  constructor(oth: IItemInfoOnly) {
    super();
    this.id = oth.id;
    this.num = oth.num;
    this.status = oth.status;
    this.lastHistory = oth.lastHistory ? new HistoryInfoOnly(oth.lastHistory) : null;
  }

  public equals(oth: any): boolean {
    if (oth === undefined || oth === null) return false;
    if (!(oth instanceof ItemInfoOnly)) return false;
    return (
      this.id === oth.id &&
      this.num === oth.num &&
      this.status === oth.status &&
      BaseVo.equalsForNullable(this.lastHistory, oth.lastHistory)
    );
  }
}

export default ItemInfoOnly;

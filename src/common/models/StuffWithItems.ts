import { List } from 'immutable';

import ItemInfoOnly from '@common/models/ItemInfoOnly';
import type { IItemInfoOnly } from '@common/models/ItemInfoOnly';
import Stuff, { type IStuff } from '@common/models/Stuff';

export interface IStuffWithItems extends IStuff {
  items: List<IItemInfoOnly>;
}

export class StuffWithItems extends Stuff {
  public static NIL: StuffWithItems = new StuffWithItems({
    ...Stuff.NIL,
    items: List<IItemInfoOnly>([]),
  });

  public items: List<ItemInfoOnly>;

  constructor(oth: IStuffWithItems) {
    super(oth);
    this.items = List<ItemInfoOnly>(oth.items.map((item) => new ItemInfoOnly(item)));
  }

  public equals(oth: any): boolean {
    if (oth === undefined || oth === null) return false;
    if (!(oth instanceof StuffWithItems)) return false;
    return (
      super.equals(oth) &&
      this.items.reduce(
        (acc, val, idx) => acc && val === oth.items.get(idx),
        this.items.size === oth.items.size
      )
    );
  }
}

export default StuffWithItems;

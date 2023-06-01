import { List } from 'immutable';

import type ItemInfoOnly from '@common/models/ItemInfoOnly';
import Stuff from '@common/models/Stuff';

class StuffWithItems extends Stuff {
  items: List<ItemInfoOnly>;

  constructor(oth: StuffWithItems) {
    super(oth);
    this.items = List(oth.items);
  }
}

export default StuffWithItems;

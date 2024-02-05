import type { List } from 'immutable';

import type ItemInfoOnly from '@common/models/ItemInfoOnly';
import type Stuff from '@common/models/Stuff';
import StuffWithItems from '@common/models/StuffWithItems';

export function sortStuffList(stuffList: List<Stuff>) {
  return stuffList.sort((left, right) => {
    if (left.name > right.name) {
      return 1;
    }
    if (left.name < right.name) {
      return -1;
    }
    return 0;
  });
}

function sortItemList(itemList: List<ItemInfoOnly>) {
  return itemList.sort((left, right) => {
    if (left.num > right.num) {
      return 1;
    }
    if (left.num < right.num) {
      return -1;
    }
    return 0;
  });
}

export function sortItemListOfStuff(stuff: StuffWithItems) {
  return new StuffWithItems({ ...stuff, items: sortItemList(stuff.items) });
}

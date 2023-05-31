import type { List } from 'immutable';

import type Stuff from '@common/models/Stuff';

function sortStuffList(stuffList: List<Stuff>) {
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

export default sortStuffList;

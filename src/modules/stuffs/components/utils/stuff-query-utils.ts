import type { List } from 'immutable';
import { useQuery } from 'vue-query';

import { getAllStuffsInDept, getStuff } from '@common/apis/belieme-apis';
import { stuffKeys } from '@common/apis/query-keys';
import type Stuff from '@common/models/Stuff';
import type StuffWithItems from '@common/models/StuffWithItems';

import sortStuffList from '@^stuffs/utils/stuff-sorter';

export function getStuffListQuery(userToken: string, curDeptId: string) {
  return useQuery<List<Stuff>>(stuffKeys.list(curDeptId), async () => {
    let stuffList = await getAllStuffsInDept(userToken, curDeptId);
    stuffList = sortStuffList(stuffList);
    return stuffList;
  });
}

export function getStuffDetailQuery(userToken: string, selectedId: string) {
  return useQuery<StuffWithItems>(stuffKeys.detail(selectedId), () =>
    getStuff(userToken, selectedId)
  );
}

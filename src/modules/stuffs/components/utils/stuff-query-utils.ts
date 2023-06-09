import { List } from 'immutable';
import { storeToRefs } from 'pinia';
import { QueryClient, useQuery } from 'vue-query';

import { getAllStuffsInDept, getStuff } from '@common/apis/belieme-apis';
import { stuffKeys } from '@common/apis/query-keys';
import type Stuff from '@common/models/Stuff';
import type StuffWithItems from '@common/models/StuffWithItems';
import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';

import useStuffSelectedStore from '@^stuffs/stores/stuff-selected-store';
import sortStuffList from '@^stuffs/utils/stuff-sorter';

const userTokenStorage = useUserTokenStorage();
const { userToken } = storeToRefs(userTokenStorage);

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);

const stuffStore = useStuffSelectedStore();
const { selectedId } = storeToRefs(stuffStore);

export function getStuffListQuery() {
  return useQuery<List<Stuff>>(stuffKeys.list(curDeptId.value), async () => {
    let stuffList = await getAllStuffsInDept(userToken.value, curDeptId.value);
    stuffList = sortStuffList(stuffList);
    return stuffList;
  });
}

export function getStuffDetailQuery() {
  return useQuery<StuffWithItems>(stuffKeys.detail(selectedId.value), () =>
    getStuff(userToken.value, selectedId.value)
  );
}

export function reloadStuffDataUsingCacheAndResponse(
  queryClient: QueryClient,
  response: StuffWithItems,
  isListDataStale: boolean
) {
  if (isListDataStale) {
    queryClient.invalidateQueries(stuffKeys.list(curDeptId.value));
  } else {
    queryClient.setQueryData(stuffKeys.list(curDeptId.value), (oldData?: List<Stuff>) => {
      if (oldData === undefined) return List<Stuff>();
      let newStuffList = oldData.filter((e) => e.id !== response.id);
      newStuffList = newStuffList.push(response);
      newStuffList = sortStuffList(newStuffList);
      return newStuffList;
    });
  }
  stuffStore.updateSelectedId(response.id);
  queryClient.setQueryData(stuffKeys.detail(response.id), response);
}

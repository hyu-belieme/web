import { List } from 'immutable';
import { storeToRefs } from 'pinia';
import { NIL as NIL_UUID } from 'uuid';
import { QueryClient, useQuery } from 'vue-query';

import { getAllStuffsInDept, getStuff } from '@common/apis/beliemeApis';
import { stuffKeys } from '@common/apis/queryKeys';
import type Stuff from '@common/models/Stuff';
import type StuffWithItems from '@common/models/StuffWithItems';
import useDeptStore from '@common/stores/deptStore';

import useStuffSelectedStore from '@^stuffs/stores/stuffSelectedStore';
import sortStuffList from '@^stuffs/utils/stuffSorter';

const deptStore = useDeptStore();
const { deptId } = storeToRefs(deptStore);

const stuffStore = useStuffSelectedStore();
const { selectedId } = storeToRefs(stuffStore);

function convertIdToFirstIdIfNotExist(id: string, stuffList: List<Stuff>) {
  if (stuffList.isEmpty()) return NIL_UUID;

  const selected = stuffList.find((value) => value.id === id);
  if (selected === undefined) return stuffList.get(0)!.id;
  return selected.id;
}

export function getStuffListQuery() {
  return useQuery<List<Stuff>>(stuffKeys.list(deptId.value), async () => {
    let stuffList = await getAllStuffsInDept(deptId.value);
    stuffList = sortStuffList(stuffList);
    stuffStore.updateSelectedId(convertIdToFirstIdIfNotExist(selectedId.value, stuffList));
    return stuffList;
  });
}

export function getStuffDetailQuery() {
  return useQuery<StuffWithItems>(stuffKeys.detail(selectedId.value), () =>
    getStuff(selectedId.value)
  );
}

export function reloadStuffDataUsingCacheAndResponse(
  queryClient: QueryClient,
  response: StuffWithItems,
  isListDataStale: boolean
) {
  if (isListDataStale) {
    queryClient.invalidateQueries(stuffKeys.list(deptId.value));
  } else {
    queryClient.setQueryData(stuffKeys.list(deptId.value), (oldData?: List<Stuff>) => {
      if (oldData === undefined) return List<Stuff>();
      let newStuffList = oldData.filter((e) => e.id !== response.id);
      newStuffList = newStuffList.push(response);
      newStuffList = sortStuffList(newStuffList);
      stuffStore.updateSelectedId(convertIdToFirstIdIfNotExist(response.id, newStuffList));
      return newStuffList;
    });
  }
  queryClient.setQueryData(stuffKeys.detail(response.id), response);
}

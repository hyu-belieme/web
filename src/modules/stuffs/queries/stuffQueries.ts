import type { List } from "immutable";
import { storeToRefs } from "pinia";
import { NIL as NIL_UUID } from "uuid";
import { QueryClient, useQuery } from "vue-query";

import { getAllStuffsInDept, getStuff } from "@common/apis/beliemeApis";
import { stuffKeys } from "@common/apis/queryKeys";
import { useDeptStore } from "@common/stores/deptStore";
import type { Stuff, StuffWithItems } from "@common/types/Models";

import { useStuffStore } from "@^stuffs/stores/stuffStore";
import { sortStuffList } from "@^stuffs/utils/stuffSorter";

const deptStore = useDeptStore();
const { deptId } = storeToRefs(deptStore);

const stuffStore = useStuffStore();
const { selectedId } = storeToRefs(stuffStore);

export const getStuffListQuery = () => {
  return useQuery<List<Stuff>>(stuffKeys.list(), async () => {
    let stuffList = await getAllStuffsInDept(deptId.value);
    stuffList = sortStuffList(stuffList);
    stuffStore.updateSelectedId(_convertIdToFirstIdIfNotExist(selectedId.value, stuffList));
    return stuffList;
  });
};

export const getStuffDetailQuery = () => {
  return useQuery<StuffWithItems>(stuffKeys.detail(selectedId.value), async () =>
    getStuff(selectedId.value)
  );
};

export function invalidateStuffListQuery(queryClient: QueryClient) {
  queryClient.invalidateQueries(stuffKeys.list());
}

export const invalidateStuffDetailQuery = (queryClient: QueryClient) => {
  queryClient.invalidateQueries(stuffKeys.detail(selectedId.value));
};

export function setStuffListQueryData(
  queryClient: QueryClient,
  newList: List<Stuff>,
  newSelectedId: string
) {
  newList = sortStuffList(newList);
  queryClient.setQueryData(stuffKeys.list(), newList);
  stuffStore.updateSelectedId(_convertIdToFirstIdIfNotExist(newSelectedId, newList));
}

export function setStuffDetailQueryData(queryClient: QueryClient, newStuff: StuffWithItems) {
  queryClient.setQueryData(stuffKeys.detail(newStuff.id), newStuff);
}

function _convertIdToFirstIdIfNotExist(id: string, stuffList: List<Stuff>) {
  if (stuffList.isEmpty()) return NIL_UUID;

  const selected = stuffList.find((value) => value.id === id);
  if (selected === undefined) return stuffList.get(0)!.id;
  return selected.id;
}

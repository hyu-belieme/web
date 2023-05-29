import type { List } from "immutable";
import { storeToRefs } from "pinia";
import { NIL as NIL_UUID } from "uuid";
import { useQuery } from "vue-query";

import { getAllStuffsInDept, getStuff } from "@common/apis/beliemeApis";
import { stuffKeys } from "@common/apis/queryKeys";
import { useDeptStore } from "@common/stores/deptStore";
import type { Stuff, StuffWithItems } from "@common/types/Models";

import { useStuffSelectedStore } from "@^stuffs/stores/stuffSelectedStore";
import { sortStuffList } from "@^stuffs/utils/stuffSorter";

const deptStore = useDeptStore();
const { deptId } = storeToRefs(deptStore);

const stuffStore = useStuffSelectedStore();
const { selectedId } = storeToRefs(stuffStore);

export const getStuffListQuery = () => {
  return useQuery<List<Stuff>>(stuffKeys.list(), async () => {
    let stuffList = await getAllStuffsInDept(deptId.value);
    stuffList = sortStuffList(stuffList);
    stuffStore.updateSelectedId(convertIdToFirstIdIfNotExist(selectedId.value, stuffList));
    return stuffList;
  });
};

export const getStuffDetailQuery = () => {
  return useQuery<StuffWithItems>(stuffKeys.detail(selectedId.value), () =>
    getStuff(selectedId.value)
  );
};

export function convertIdToFirstIdIfNotExist(id: string, stuffList: List<Stuff>) {
  if (stuffList.isEmpty()) return NIL_UUID;

  const selected = stuffList.find((value) => value.id === id);
  if (selected === undefined) return stuffList.get(0)!.id;
  return selected.id;
}

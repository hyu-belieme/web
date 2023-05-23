import type { List } from "immutable";
import { storeToRefs } from "pinia";
import { NIL as NIL_UUID } from "uuid";
import { QueryClient, useQuery } from "vue-query";

import { getAllStuffsInDept, getStuff } from "@common/apis/beliemeApis";
import { stuffKeys } from "@common/apis/queryKeys";
import { useDeptStore } from "@common/stores/deptStore";
import type { Stuff, StuffWithItems } from "@common/types/Models";
import { GLOBAL_STALE_TIME } from "@common/utils/Globals";
import QueryCache from "@common/utils/queryCache";

import { useStuffStore } from "@^stuffs/stores/stuffStore";

const deptStore = useDeptStore();
const { deptId } = storeToRefs(deptStore);

const stuffStore = useStuffStore();
const { selectedId } = storeToRefs(stuffStore);

let _stuffDetailCache: QueryCache<string, StuffWithItems>;

export const getStuffListQuery = () => {
  return useQuery<List<Stuff>>(stuffKeys.list(), async () => {
    let stuffList = await getAllStuffsInDept(deptId.value);
    stuffStore.updateSelectedId(_getInitialSelectedIdx(stuffList));
    return stuffList;
  });
};

export const getStuffDetailQuery = () => {
  if (_stuffDetailCache === undefined) {
    _stuffDetailCache = new QueryCache(GLOBAL_STALE_TIME);
  }

  return useQuery<StuffWithItems>(stuffKeys.detail(), async () => {
    const stuff = await getStuff(selectedId.value);
    _stuffDetailCache.updateCacheData(selectedId.value, stuff);
    return stuff;
  });
};

export const invalidateStuffDetailQuery = (queryClient: QueryClient) => {
  _stuffDetailCache.clearCache();
  queryClient.invalidateQueries(stuffKeys.detail());
  return;
};

export const invalidateStuffDetailQueryAfterCacheCheck = (queryClient: QueryClient) => {
  let resultFromCache = _stuffDetailCache.getCachedData(selectedId.value);
  if (resultFromCache === undefined) {
    queryClient.invalidateQueries(stuffKeys.detail());
    return;
  }
  queryClient.setQueryData(stuffKeys.detail(), resultFromCache);
  return;
};

function _getInitialSelectedIdx(stuffList: List<Stuff>) {
  if (stuffList.isEmpty()) return NIL_UUID;

  const selected = stuffList.find((value) => value.id === selectedId.value);
  if (selected === undefined) return stuffList.get(0)!.id;
  return selected.id;
}

import type { List } from "immutable";
import { storeToRefs } from "pinia";
import { QueryClient, type UseQueryReturnType, useQuery } from "vue-query";

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

let stuffListQuery: undefined | UseQueryReturnType<List<Stuff>, unknown> = undefined;
let stuffDetailQuery: undefined | UseQueryReturnType<StuffWithItems, unknown> = undefined;

let stuffDetailCache: QueryCache<string, StuffWithItems>;

export const getStuffListQuery = () => {
  if (stuffListQuery === undefined) {
    stuffListQuery = useQuery<List<Stuff>>(stuffKeys.list(), () =>
      getAllStuffsInDept(deptId.value)
    );
  }
  return stuffListQuery;
};

export const getStuffDetailQuery = () => {
  if (stuffDetailQuery === undefined) {
    stuffDetailQuery = useQuery<StuffWithItems>(stuffKeys.detail(), async () => {
      const stuff = await getStuff(selectedId.value);
      stuffDetailCache.updateCacheData(selectedId.value, stuff);
      return stuff;
    });
    stuffDetailCache = new QueryCache(GLOBAL_STALE_TIME);
  }
  return stuffDetailQuery;
};

export const invalidateStuffDetailQuery = (queryClient: QueryClient) => {
  stuffDetailCache.clearCache();
  queryClient.invalidateQueries(stuffKeys.detail());
  return;
};

export const invalidateStuffDetailQueryAfterCacheCheck = (queryClient: QueryClient) => {
  let resultFromCache = stuffDetailCache.getCachedData(selectedId.value);
  if (resultFromCache === undefined) {
    queryClient.invalidateQueries(stuffKeys.detail());
    return;
  }
  queryClient.setQueryData(stuffKeys.detail(), resultFromCache);
  return;
};

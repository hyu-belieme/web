import type { List } from "immutable";
import { storeToRefs } from "pinia";
import { QueryClient, type UseQueryReturnType, useQuery } from "vue-query";

import {
  getAllHistoryInDept,
  getAllRequesterHistoryInDept,
  getHistory
} from "@common/apis/beliemeApis";
import { historyKeys } from "@common/apis/queryKeys";
import { useDeptStore } from "@common/stores/deptStore";
import { useUserStore } from "@common/stores/userStore";
import type { History } from "@common/types/Models";
import { GLOBAL_STALE_TIME } from "@common/utils/Globals";
import QueryCache from "@common/utils/queryCache";

import { useHistoryStore } from "@^histories/stores/historyStore";

const userStore = useUserStore();
const { user, userMode } = storeToRefs(userStore);

const deptStore = useDeptStore();
const { deptId } = storeToRefs(deptStore);

const historyStore = useHistoryStore();
const { selectedId } = storeToRefs(historyStore);

let historyListQuery: undefined | UseQueryReturnType<List<History>, unknown> = undefined;
let historyDetailQuery: undefined | UseQueryReturnType<History, unknown> = undefined;

let historyDetailCache: QueryCache<string, History>;

export const getHistoryListQuery = () => {
  if (historyListQuery === undefined) {
    historyListQuery = useQuery<List<History>>(historyKeys.list(), () => {
      if (userMode.value === "USER") {
        return getAllRequesterHistoryInDept(deptId.value, user.value.id);
      }
      return getAllHistoryInDept(deptId.value);
    });
  }
  return historyListQuery;
};

export const getHistoryDetailQuery = () => {
  if (historyDetailQuery === undefined) {
    historyDetailQuery = useQuery<History>(historyKeys.detail(), async () => {
      const history = await getHistory(selectedId.value);
      historyDetailCache.updateCacheData(selectedId.value, history);
      return history;
    });
    historyDetailCache = new QueryCache(GLOBAL_STALE_TIME);
  }
  return historyDetailQuery;
};

export const invalidateHistoryDetailQuery = (queryClient: QueryClient) => {
  historyDetailCache.clearCache();
  queryClient.invalidateQueries(historyKeys.detail());
};

export const invalidateStuffDetailQueryAfterCacheCheck = (queryClient: QueryClient) => {
  let resultFromCache = historyDetailCache.getCachedData(selectedId.value);
  if (resultFromCache === undefined) {
    queryClient.invalidateQueries(historyKeys.detail());
    return;
  }
  queryClient.setQueryData(historyKeys.detail(), resultFromCache);
};

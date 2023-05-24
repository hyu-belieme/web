import type { List } from "immutable";
import { storeToRefs } from "pinia";
import { NIL as NIL_UUID } from "uuid";
import { QueryClient, useQuery } from "vue-query";

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
import { sortHistoryList } from "@^histories/utils/historySorter";

const userStore = useUserStore();
const { user, userMode } = storeToRefs(userStore);

const deptStore = useDeptStore();
const { deptId } = storeToRefs(deptStore);

const historyStore = useHistoryStore();
const { selectedId } = storeToRefs(historyStore);

let historyDetailCache: QueryCache<string, History>;

export const getHistoryListQuery = () => {
  return useQuery<List<History>>(historyKeys.list(), async () => {
    let historyList = await _getHistoryList();
    historyList = sortHistoryList(historyList);
    historyStore.updateSelectedId(_getInitialSelectedId(historyList));
    return historyList;
  });
};

export const getHistoryDetailQuery = () => {
  if (historyDetailCache === undefined) {
    historyDetailCache = new QueryCache(GLOBAL_STALE_TIME);
  }

  return useQuery<History>(historyKeys.detail(), async () => {
    const history = await getHistory(selectedId.value);
    historyDetailCache.updateCacheData(selectedId.value, history);
    return history;
  });
};

export const invalidateHistoryListQueryAndResetIndex = (queryClient: QueryClient) => {
  historyStore.updateSelectedId(NIL_UUID);
  queryClient.invalidateQueries(historyKeys.list());
};

export const invalidateHistoryDetailQuery = (queryClient: QueryClient) => {
  historyDetailCache.clearCache();
  queryClient.invalidateQueries(historyKeys.detail());
};

export const invalidateHistoryDetailQueryAfterCacheCheck = (queryClient: QueryClient) => {
  let resultFromCache = historyDetailCache.getCachedData(selectedId.value);
  if (resultFromCache === undefined) {
    queryClient.invalidateQueries(historyKeys.detail());
    return;
  }
  queryClient.setQueryData(historyKeys.detail(), resultFromCache);
};

const _getHistoryList = () => {
  if (userMode.value === "USER") {
    return getAllRequesterHistoryInDept(deptId.value, user.value.id);
  }
  return getAllHistoryInDept(deptId.value);
};

function _getInitialSelectedId(historyList: List<History>) {
  if (historyList.isEmpty()) return NIL_UUID;

  const selected = historyList.find((value) => value.id === selectedId.value);
  if (selected === undefined) return historyList.get(0)!.id;
  return selected.id;
}

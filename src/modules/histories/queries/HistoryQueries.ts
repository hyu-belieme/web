import { List, Map } from "immutable";
import { storeToRefs } from "pinia";
import { NIL as NIL_UUID, stringify } from "uuid";
import { QueryClient, useQuery } from "vue-query";

import {
  getAllHistoryInDept,
  getAllRequesterHistoryInDept,
  getHistory
} from "@common/apis/beliemeApis";
import { historyKeys } from "@common/apis/queryKeys";
import { useDeptStore } from "@common/stores/deptStore";
import { useUserStore } from "@common/stores/userStore";
import type { History, HistoryStatus } from "@common/types/Models";
import { GLOBAL_STALE_TIME } from "@common/utils/Globals";
import QueryCache from "@common/utils/queryCache";

import { useHistoryStore } from "@^histories/stores/historyStore";

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
    historyList = _sortHistoryList(historyList);
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

function _sortHistoryList(historyList: List<History>) {
  const historyStatusPriority = _makeStatusPriorityMap(_basicHistorySequence);
  return historyList.sort((left, right) => {
    let statusComp = _compareHistoryStatus(historyStatusPriority, left.status, right.status);
    if (statusComp !== 0) return statusComp;

    return _compareHistoryTimes(left, right);
  });
}

const _basicHistorySequence = List([
  List<HistoryStatus>(["REQUESTED"]),
  List<HistoryStatus>(["USING", "DELAYED"]),
  List<HistoryStatus>(["LOST"]),
  List<HistoryStatus>(["RETURNED", "FOUND"]),
  List<HistoryStatus>(["EXPIRED"])
]);

function _makeStatusPriorityMap(sequence: List<List<HistoryStatus>>) {
  let statusPriority: Map<HistoryStatus, number> = Map();
  sequence.forEach((statuses, index) => {
    statuses.forEach((e) => (statusPriority = statusPriority.set(e, index)));
  });
  return statusPriority;
}

function _compareHistoryStatus(
  statusPriority: Map<HistoryStatus, number>,
  left: HistoryStatus,
  right: HistoryStatus
) {
  if (!statusPriority.has(left) && !statusPriority.has(right)) return 0;
  if (!statusPriority.has(left)) return -1;
  if (!statusPriority.has(right)) return 1;
  return statusPriority.get(left)! - statusPriority.get(right)!;
}

function _compareHistoryTimes(left: History, right: History) {
  if (left.status === "REQUESTED" || left.status === "EXPIRED") {
    return (right.requestedAt || 0) - (left.requestedAt || 0);
  } else if (left.status === "USING" || left.status === "DELAYED") {
    return (right.approvedAt || 0) - (left.approvedAt || 0);
  } else if (left.status === "LOST") {
    return (right.lostAt || 0) - (left.lostAt || 0);
  } else if (left.status === "RETURNED" || left.status === "FOUND") {
    return (right.approvedAt || right.lostAt || 0) - (left.approvedAt || left.lostAt || 0);
  }
  return 0;
}

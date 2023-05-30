import { List } from "immutable";
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

import { useHistorySelectedStore } from "@^histories/stores/historySelectedStore";
import { sortHistoryList } from "@^histories/utils/historySorter";

const userStore = useUserStore();
const { user, userMode } = storeToRefs(userStore);

const deptStore = useDeptStore();
const { deptId } = storeToRefs(deptStore);

const historySelectedStore = useHistorySelectedStore();
const { selectedId } = storeToRefs(historySelectedStore);

export const getHistoryListQuery = () => {
  return useQuery<List<History>>(historyKeys.list(), async () => {
    let historyList = await _getHistoryList();
    historyList = sortHistoryList(historyList);
    historySelectedStore.updateSelectedId(
      _convertIdToFirstIdIfNotExist(selectedId.value, historyList)
    );
    return historyList;
  });
};

export const getHistoryDetailQuery = () => {
  return useQuery<History>(historyKeys.detail(selectedId.value), () =>
    getHistory(selectedId.value)
  );
};

export function reloadHistoryDataUsingCacheAndResponse(
  queryClient: QueryClient,
  response: History,
  isListDataStale: boolean
) {
  if (isListDataStale) {
    queryClient.invalidateQueries({ queryKey: historyKeys.list() });
  } else {
    queryClient.setQueryData(historyKeys.list(), (oldData: List<History> | undefined) => {
      if (oldData === undefined) return List<History>();
      let newHistoryList = oldData.filter((e) => e.id !== response.id);
      newHistoryList = newHistoryList.push(response);
      newHistoryList = sortHistoryList(newHistoryList);
      return newHistoryList;
    });
  }
  queryClient.setQueryData(historyKeys.detail(response.id), response);
}

function _convertIdToFirstIdIfNotExist(id: string, historyList: List<History>) {
  if (historyList.isEmpty()) return NIL_UUID;

  const selected = historyList.find((value) => value.id === id);
  if (selected === undefined) return historyList.get(0)!.id;
  return selected.id;
}

function _getHistoryList() {
  if (userMode.value === "USER") {
    return getAllRequesterHistoryInDept(deptId.value, user.value.id);
  }
  return getAllHistoryInDept(deptId.value);
}
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
  if (userMode.value === "USER") {
    return useQuery<List<History>>(
      historyKeys.listByDeptAndRequester(deptId.value, user.value.id),
      async () => {
        let historyList = await getAllRequesterHistoryInDept(deptId.value, user.value.id);
        historyList = sortHistoryList(historyList);
        historySelectedStore.updateSelectedId(
          _convertIdToFirstIdIfNotExist(selectedId.value, historyList)
        );
        return historyList;
      }
    );
  }
  return useQuery<List<History>>(historyKeys.listByDept(deptId.value), async () => {
    let historyList = await getAllHistoryInDept(deptId.value);
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
  const curListKey =
    userMode.value === "USER"
      ? historyKeys.listByDeptAndRequester(deptId.value, user.value.id)
      : historyKeys.listByDept(deptId.value);

  const othListKey =
    userMode.value === "USER"
      ? historyKeys.listByDept(deptId.value)
      : historyKeys.listByDeptAndRequester(deptId.value, user.value.id);

  if (isListDataStale) {
    queryClient.invalidateQueries(curListKey);
  } else {
    queryClient.setQueryData(curListKey, (oldData: List<History> | undefined) => {
      if (oldData === undefined) return List<History>();
      let newHistoryList = oldData.filter((e) => e.id !== response.id);
      newHistoryList = newHistoryList.push(response);
      newHistoryList = sortHistoryList(newHistoryList);
      return newHistoryList;
    });
  }
  queryClient.invalidateQueries(othListKey);
  queryClient.setQueryData(historyKeys.detail(response.id), response);
}

function _convertIdToFirstIdIfNotExist(id: string, historyList: List<History>) {
  if (historyList.isEmpty()) return NIL_UUID;

  const selected = historyList.find((value) => value.id === id);
  if (selected === undefined) return historyList.get(0)!.id;
  return selected.id;
}

import { List } from 'immutable';
import { storeToRefs } from 'pinia';
import { NIL as NIL_UUID } from 'uuid';
import { QueryClient, useQuery } from 'vue-query';

import {
  getAllHistoryInDept,
  getAllRequesterHistoryInDept,
  getHistory,
} from '@common/apis/belieme-apis';
import { historyKeys } from '@common/apis/query-keys';
import type History from '@common/models/History';
import useUserStore from '@common/stores/user-store';

import useHistorySelectedStore from '@^histories/stores/history-selected-store';
import sortHistoryList from '@^histories/utils/history-sorter';

const userStore = useUserStore();
const { userMode } = storeToRefs(userStore);

function getUserInfo() {
  const userString = sessionStorage.getItem('user-info') || undefined;
  if (userString === undefined) return undefined;

  return JSON.parse(userString);
}

const user = getUserInfo();

const deptId = localStorage.getItem('dept-id') || '';

const historySelectedStore = useHistorySelectedStore();
const { selectedId } = storeToRefs(historySelectedStore);

function convertIdToFirstIdIfNotExist(id: string, historyList: List<History>) {
  if (historyList.isEmpty()) return NIL_UUID;

  const selected = historyList.find((value) => value.id === id);
  if (selected === undefined) return historyList.get(0)!.id;
  return selected.id;
}

export function getHistoryListQuery() {
  if (userMode.value === 'USER') {
    return useQuery<List<History>>(
      historyKeys.listByDeptAndRequester(deptId, user.id),
      async () => {
        let historyList = await getAllRequesterHistoryInDept(deptId, user.id);
        historyList = sortHistoryList(historyList);
        historySelectedStore.updateSelectedId(
          convertIdToFirstIdIfNotExist(selectedId.value, historyList)
        );
        return historyList;
      }
    );
  }
  return useQuery<List<History>>(historyKeys.listByDept(deptId), async () => {
    let historyList = await getAllHistoryInDept(deptId);
    historyList = sortHistoryList(historyList);
    historySelectedStore.updateSelectedId(
      convertIdToFirstIdIfNotExist(selectedId.value, historyList)
    );
    return historyList;
  });
}

export function getHistoryDetailQuery() {
  return useQuery<History>(historyKeys.detail(selectedId.value), () =>
    getHistory(selectedId.value)
  );
}

export function reloadHistoryDataUsingCacheAndResponse(
  queryClient: QueryClient,
  response: History,
  isListDataStale: boolean
) {
  const curListKey =
    userMode.value === 'USER'
      ? historyKeys.listByDeptAndRequester(deptId, user.id)
      : historyKeys.listByDept(deptId);

  const othListKey =
    userMode.value === 'USER'
      ? historyKeys.listByDept(deptId)
      : historyKeys.listByDeptAndRequester(deptId, user.id);

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

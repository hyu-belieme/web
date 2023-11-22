import { List } from 'immutable';
import { storeToRefs } from 'pinia';
import { QueryClient, useQuery } from 'vue-query';

import {
  getAllHistoryInDept,
  getAllRequesterHistoryInDept,
  getHistory,
} from '@common/apis/belieme-apis';
import { historyKeys } from '@common/apis/query-keys';
import type History from '@common/models/History';
import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useLoggedInUserStorage from '@common/storages/logged-in-user-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';
import useUserModeStore from '@common/stores/user-mode-store';

import useHistorySelectedStore from '@^histories/stores/history-selected-store';
import sortHistoryList from '@^histories/utils/history-sorter';

const userModeStore = useUserModeStore();
const { userMode } = storeToRefs(userModeStore);

const userTokenStorage = useUserTokenStorage();
const { userToken } = storeToRefs(userTokenStorage);

const loggedInUserStorage = useLoggedInUserStorage();
const { loggedInUserId } = storeToRefs(loggedInUserStorage);

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);

const historySelectedStore = useHistorySelectedStore();
const { selectedId } = storeToRefs(historySelectedStore);

export function getHistoryListQuery() {
  if (userMode.value === 'USER') {
    return useQuery<List<History>>(
      historyKeys.listByDeptAndRequester(curDeptId.value, loggedInUserId.value),
      async () => {
        let historyList = await getAllRequesterHistoryInDept(
          userToken.value,
          curDeptId.value,
          loggedInUserId.value
        );
        historyList = sortHistoryList(historyList);
        return historyList;
      }
    );
  }
  return useQuery<List<History>>(historyKeys.listByDept(curDeptId.value), async () => {
    let historyList = await getAllHistoryInDept(userToken.value, curDeptId.value);
    historyList = sortHistoryList(historyList);
    return historyList;
  });
}

export function getHistoryListQueryForUserMode() {
  return useQuery<List<History>>(
    historyKeys.listByDeptAndRequester(curDeptId.value, loggedInUserId.value),
    async () => {
      let historyList = await getAllRequesterHistoryInDept(
        userToken.value,
        curDeptId.value,
        loggedInUserId.value
      );
      historyList = sortHistoryList(historyList);
      return historyList;
    }
  );
}

export function getHistoryListQueryForStaffMode() {
  return useQuery<List<History>>(historyKeys.listByDept(curDeptId.value), async () => {
    let historyList = await getAllHistoryInDept(userToken.value, curDeptId.value);
    historyList = sortHistoryList(historyList);
    return historyList;
  });
}

export function getHistoryDetailQuery() {
  return useQuery<History>(historyKeys.detail(selectedId.value), () =>
    getHistory(userToken.value, selectedId.value)
  );
}

export function reloadHistoryDataUsingCacheAndResponse(
  queryClient: QueryClient,
  response: History,
  isListDataStale: boolean
) {
  const curListKey =
    userMode.value === 'USER'
      ? historyKeys.listByDeptAndRequester(curDeptId.value, loggedInUserId.value)
      : historyKeys.listByDept(curDeptId.value);

  const othListKey =
    userMode.value === 'USER'
      ? historyKeys.listByDept(curDeptId.value)
      : historyKeys.listByDeptAndRequester(curDeptId.value, loggedInUserId.value);

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

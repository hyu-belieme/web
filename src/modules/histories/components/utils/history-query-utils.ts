import { List } from 'immutable';
import { storeToRefs } from 'pinia';
import { NIL as NIL_UUID } from 'uuid';
import { computed } from 'vue';
import { QueryClient, useQuery } from 'vue-query';

import {
  getAllHistoryInDept,
  getAllRequesterHistoryInDept,
  getHistory,
} from '@common/apis/belieme-apis';
import { historyKeys } from '@common/apis/query-keys';
import type History from '@common/models/History';
import useDeptStore from '@common/stores/new-dept-store';
import useNewUserStore from '@common/stores/new-user-store';
import useUserStore from '@common/stores/user-store';

import useHistorySelectedStore from '@^histories/stores/history-selected-store';
import sortHistoryList from '@^histories/utils/history-sorter';

const userStore = useUserStore();
const { userMode } = storeToRefs(userStore);

const newUserStore = useNewUserStore();
const { user } = storeToRefs(newUserStore);
const userId = computed(() => user.value?.id || '');
const userToken = computed(() => user.value?.token || '');

const deptStore = useDeptStore();
const deptId = computed(() => storeToRefs(deptStore).deptId.value || '');

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
      historyKeys.listByDeptAndRequester(deptId.value, userId.value),
      async () => {
        let historyList = await getAllRequesterHistoryInDept(
          userToken.value,
          deptId.value,
          userId.value
        );
        historyList = sortHistoryList(historyList);
        historySelectedStore.updateSelectedId(
          convertIdToFirstIdIfNotExist(selectedId.value, historyList)
        );
        return historyList;
      }
    );
  }
  return useQuery<List<History>>(historyKeys.listByDept(deptId.value), async () => {
    let historyList = await getAllHistoryInDept(userToken.value, deptId.value);
    historyList = sortHistoryList(historyList);
    historySelectedStore.updateSelectedId(
      convertIdToFirstIdIfNotExist(selectedId.value, historyList)
    );
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
      ? historyKeys.listByDeptAndRequester(deptId.value, userId.value)
      : historyKeys.listByDept(deptId.value);

  const othListKey =
    userMode.value === 'USER'
      ? historyKeys.listByDept(deptId.value)
      : historyKeys.listByDeptAndRequester(deptId.value, userId.value);

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

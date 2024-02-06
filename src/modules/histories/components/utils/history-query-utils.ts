import type { List } from 'immutable';
import { useInfiniteQuery, useQuery } from 'vue-query';

import {
  getHistory,
  getHistoryListByDept,
  getHistoryListByDeptWithPagination,
} from '@common/apis/belieme-apis';
import { historyKeys } from '@common/apis/query-keys';
import type History from '@common/models/History';
import type HistoryPaginationWrapper from '@common/models/HistoryPaginationWrapper';
import type HistoryStatus from '@common/models/types/HistoryStatus';

export function getHistoryListQuery(
  userToken: string,
  deptId: string,
  requesterId: string | undefined,
  status: HistoryStatus | undefined
) {
  return useQuery<List<History>>(historyKeys.listByDept(deptId, requesterId, status), async () => {
    const historyList = await getHistoryListByDept(userToken, deptId, requesterId, status);
    return historyList;
  });
}

export function getHistoryListInfiniteQuery(
  userToken: string,
  deptId: string,
  requesterId: string | undefined,
  status: HistoryStatus | undefined,
  pageSize: number
) {
  return useInfiniteQuery<HistoryPaginationWrapper>(
    historyKeys.listByDept(deptId, requesterId, status),
    async ({ pageParam = { cursor: undefined, limit: pageSize } }) => {
      const { cursor, limit } = pageParam;
      const historyList = await getHistoryListByDeptWithPagination(
        userToken,
        deptId,
        requesterId,
        status,
        cursor,
        limit
      );
      return historyList;
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.cursor.next === null) return undefined;
        return { cursor: lastPage.cursor.next, limit: pageSize };
      },
    }
  );
}

export function getHistoryDetailQuery(userToken: string, selectedId: string) {
  return useQuery<History>(historyKeys.detail(selectedId), () => getHistory(userToken, selectedId));
}

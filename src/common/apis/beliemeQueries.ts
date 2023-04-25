import { useQuery } from "vue-query";

import {
  getAllHistoryInDept,
  getAllRequesterHistoryInDept,
  getAllStuffsInDept,
  getHistory,
  getStuff
} from "@common/apis/beliemeApis";
import { historyKeys, stuffKeys } from "@common/apis/queryKeys";
import type { DepartmentId, HistoryId, StuffId, UserId } from "@common/types/Models";

export const useStuffListQuery = (deptId: DepartmentId) => {
  return useQuery(stuffKeys.list(deptId), () => getAllStuffsInDept(deptId));
};

export const useStuffDetailQuery = (stuffId: StuffId) => {
  return useQuery(stuffKeys.detail(stuffId), () => getStuff(stuffId));
};

export const useHistoryListQuery = (deptId: DepartmentId, requesterId?: UserId) => {
  return useQuery(historyKeys.list(deptId, requesterId), () => {
    if (requesterId === undefined) {
      return getAllHistoryInDept(deptId);
    } else {
      return getAllRequesterHistoryInDept(deptId, requesterId);
    }
  });
};

export const useHistoryDetailQuery = (historyId: HistoryId) => {
  return useQuery(historyKeys.detail(historyId), () => {
    return getHistory(historyId);
  });
};

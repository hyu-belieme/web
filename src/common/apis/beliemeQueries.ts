import { useQuery } from "vue-query";

import {
  getAllHistoryInDept,
  getAllRequesterHistoryInDept,
  getAllStuffsInDept,
  getHistory,
  getStuff
} from "@common/apis/beliemeApis";
import { historyKeys, stuffKeys } from "@common/apis/queryKeys";

export const useStuffListQuery = (univCode: string, deptCode: string) => {
  return useQuery(stuffKeys.list(univCode, deptCode), () => getAllStuffsInDept(univCode, deptCode));
};

export const useStuffDetailQuery = (univCode: string, deptCode: string, stuffName: string) => {
  return useQuery(stuffKeys.detail(univCode, deptCode, stuffName), () =>
    getStuff(univCode, deptCode, stuffName)
  );
};

export const useHistoryListQuery = (
  univCode: string,
  deptCode: string,
  requesterIdx?: {
    univCode: string;
    name: string;
  }
) => {
  return useQuery(historyKeys.list(univCode, deptCode, requesterIdx), () => {
    if (requesterIdx === undefined) {
      return getAllHistoryInDept(univCode, deptCode);
    } else {
      return getAllRequesterHistoryInDept(
        univCode,
        deptCode,
        requesterIdx.univCode,
        requesterIdx.name
      );
    }
  });
};

export const useHistoryDetailQuery = (
  univCode: string,
  deptCode: string,
  stuffName: string,
  itemNum: number,
  historyNum: number
) => {
  return useQuery(historyKeys.detail(univCode, deptCode, stuffName, itemNum, historyNum), () => {
    return getHistory(univCode, deptCode, stuffName, itemNum, historyNum);
  });
};

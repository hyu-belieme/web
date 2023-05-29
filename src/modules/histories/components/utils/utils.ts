import type { List } from "immutable";
import { storeToRefs } from "pinia";
import { NIL as NIL_UUID } from "uuid";
import { useQuery } from "vue-query";

import {
  getAllHistoryInDept,
  getAllRequesterHistoryInDept,
  getHistory
} from "@common/apis/beliemeApis";
import { historyKeys } from "@common/apis/queryKeys";
import { useDeptStore } from "@common/stores/deptStore";
import { useUserStore } from "@common/stores/userStore";
import type { History } from "@common/types/Models";

import { useHistoryStore } from "@^histories/stores/historyStore";
import { sortHistoryList } from "@^histories/utils/historySorter";

const userStore = useUserStore();
const { user, userMode } = storeToRefs(userStore);

const deptStore = useDeptStore();
const { deptId } = storeToRefs(deptStore);

const historyStore = useHistoryStore();
const { selectedId } = storeToRefs(historyStore);

export const getHistoryListQuery = () => {
  return useQuery<List<History>>(historyKeys.list(), async () => {
    let historyList = await _getHistoryList();
    historyList = sortHistoryList(historyList);
    historyStore.updateSelectedId(convertIdToFirstIdIfNotExist(selectedId.value, historyList));
    return historyList;
  });
};

export const getHistoryDetailQuery = () => {
  return useQuery<History>(historyKeys.detail(selectedId.value), () =>
    getHistory(selectedId.value)
  );
};

export function convertIdToFirstIdIfNotExist(id: string, historyList: List<History>) {
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

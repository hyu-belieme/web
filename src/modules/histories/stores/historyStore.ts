import { List } from "immutable";
import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

import { type Loading, loading } from "@common/types/Loading";
import type { History, HistoryStatus } from "@common/types/Models";

export const useHistoryStore = defineStore("history", () => {
  const selected = ref<CategorizedHistoryIndex>({
    category: "REQUESTED",
    index: 0
  });

  const histories = ref<List<History> | Loading | undefined>(loading);

  const categorizedHistoriesList = computed(() => {
    var output = List<CategorizedHistories>();
    HISTORY_CATEGORY_MAP.forEach((categoryMap) => {
      output = output.push({
        category: categoryMap.category,
        histories: _categorizeBy(categoryMap.targetStatus)
      });
    });
    return output;
  });

  const selectedHistory = computed(() => {
    const selectedCategory = selected.value.category;
    const selectedIndex = selected.value.index;

    if (histories.value === loading) return loading;
    if (histories.value === undefined) return undefined;

    const targetHistories = categorizedHistoriesList.value.find((e) => {
      return e.category === selectedCategory;
    })?.histories;

    if (targetHistories === undefined || targetHistories.size <= selectedIndex) return undefined;
    return targetHistories.get(selectedIndex);
  });

  const updateSelected = (newVal: CategorizedHistoryIndex) => {
    selected.value = newVal;
  };

  const updateHistories = (_histories: List<History> | Loading | undefined) => {
    histories.value = _histories;
  };

  const _categorizeBy = (targetStatus: List<HistoryStatus>) => {
    var output = List<History>();
    if (histories.value === undefined || histories.value === loading) return output;
    for (var history of histories.value) {
      if (targetStatus.contains(history.status)) output = output.push(history);
    }
    return output;
  };

  const $selected = readonly(selected);
  const $histories = readonly(histories);

  return {
    selected: $selected,
    histories: $histories,
    categorizedHistoriesList,
    selectedHistory,
    updateSelected,
    updateHistories
  };
});

const HISTORY_CATEGORY_MAP = List<{ category: HistoryCategory; targetStatus: List<HistoryStatus> }>(
  [
    { category: "REQUESTED", targetStatus: List(["REQUESTED"]) },
    { category: "USING", targetStatus: List(["USING", "DELAYED"]) },
    { category: "LOST", targetStatus: List(["LOST"]) },
    { category: "RETURNED", targetStatus: List(["RETURNED", "FOUND"]) },
    { category: "EXPIRED", targetStatus: List(["EXPIRED"]) }
  ]
);

export type HistoryCategory = "REQUESTED" | "USING" | "LOST" | "RETURNED" | "EXPIRED";

export interface CategorizedHistoryIndex {
  category: HistoryCategory;
  index: number;
}

interface CategorizedHistories {
  category: HistoryCategory;
  histories: List<History>;
}

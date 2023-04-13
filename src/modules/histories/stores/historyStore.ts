import { loading, type Loading } from "@common/types/Loading";
import type { History, HistoryStatus } from "@common/types/Models";

import { List } from "immutable";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export type HistoryCategory = "REQUESTED" | "USING" | "LOST" | "RETURNED" | "EXPIRED";
interface CategorizedHistories {
  category: HistoryCategory;
  histories: List<History>;
}

export const useHistoryStore = defineStore("history", () => {
  const selected = ref<{ category: HistoryCategory; index: number }>({
    category: "REQUESTED",
    index: 0
  });
  const histories = ref<List<History> | Loading | undefined>(loading);

  const categorizedHistories = computed(() => {
    const categories = List<{ category: HistoryCategory; targetStatus: List<HistoryStatus> }>([
      { category: "REQUESTED", targetStatus: List(["REQUESTED"]) },
      { category: "USING", targetStatus: List(["USING", "DELAYED"]) },
      { category: "LOST", targetStatus: List(["LOST"]) },
      { category: "RETURNED", targetStatus: List(["RETURNED"]) },
      { category: "EXPIRED", targetStatus: List(["EXPIRED"]) }
    ]);

    var output = List<CategorizedHistories>([]);
    categories.forEach((category) => {
      output = output.push({
        category: category.category,
        histories: categorizeBy(category.targetStatus)
      });
    });
    return output;
  });

  const categorizeBy = (targetStatus: List<HistoryStatus>) => {
    var output: List<History> = List([]);
    if (histories.value === undefined || histories.value === loading) return output;
    for (var history of histories.value) {
      if (targetStatus.contains(history.status)) output = output.push(history);
    }
    return output;
  };

  const selectedHistory = computed(() => {
    if (histories.value === loading) return loading;
    if (histories.value === undefined) return undefined;
    const selectedCategory = selected.value.category;
    const selectedIndex = selected.value.index;

    var targetHistories = categorizedHistories.value.find((e) => {
      return e.category === selectedCategory;
    })?.histories;
    if (targetHistories === undefined || targetHistories.size <= selectedIndex) return undefined;
    return targetHistories.get(selectedIndex);
  });

  function updateSelected(newVal: { category: HistoryCategory; index: number }) {
    selected.value = newVal;
  }

  function updateHistory(strategy: HistoryGetStrategy) {
    histories.value = strategy.load();
  }

  return {
    selected,
    histories,
    categorizedHistories,
    selectedHistory,
    updateSelected,
    updateHistory
  };
});

interface HistoryGetStrategy {
  load: () => List<History> | Loading | undefined;
}

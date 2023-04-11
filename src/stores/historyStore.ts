import { loading, type Loading } from "@/models/Types";
import { List } from "immutable";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type History from "@/models/history/History";

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
    if (histories.value == undefined || histories.value == loading) return output;
    for (var history of histories.value) {
      if (targetStatus.contains(history.status)) output = output.push(history);
    }
    return output;
  };

  // const selectedWithCategorize = computed(() => {
  //   var remain = selected.value;
  //   var output = {
  //     category: "REQUESTED",
  //     index: remain
  //   };
  //   categorizedHistories.value.forEach((bound) => {
  //     if (remain < bound.histories.size) {
  //       output = {
  //         category: bound.category,
  //         index: remain
  //       };
  //       return false;
  //     }
  //     remain -= bound.histories.size;
  //   });

  //   return output;
  // });

  const selectedHistory = computed(() => {
    const selectedCategory = selected.value.category;
    const selectedIndex = selected.value.index;

    var histories = categorizedHistories.value.find((e) => {
      return e.category == selectedCategory;
    })?.histories;
    if (histories == undefined || histories.size <= selectedIndex) return undefined;
    return histories.get(selectedIndex);
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

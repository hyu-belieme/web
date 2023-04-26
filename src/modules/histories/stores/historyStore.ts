import { defineStore } from "pinia";
import { readonly, ref } from "vue";

import type { HistoryId } from "@common/types/Models";

export const useHistoryStore = defineStore("history", () => {
  const selectedSection = ref<number>(0);
  const selectedIndex = ref<number>(0);
  const selectedId = ref<HistoryId>({
    univCode: "",
    deptCode: "",
    stuffName: "",
    itemNum: 0,
    historyNum: 0
  });

  const updateSelected = (_selectedSection: number, _selectedIndex: number) => {
    selectedSection.value = _selectedSection;
    selectedIndex.value = _selectedIndex;
  };

  const updateSelectedId = (id: HistoryId) => {
    selectedId.value = id;
  };

  const $selectedSection = readonly(selectedSection);
  const $selectedIndex = readonly(selectedIndex);
  const $selectedId = readonly(selectedId);

  return {
    selectedSection: $selectedSection,
    selectedIndex: $selectedIndex,
    selectedId: $selectedId,
    updateSelected,
    updateSelectedId
  };
});

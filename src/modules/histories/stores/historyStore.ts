import { defineStore } from "pinia";
import { NIL as NIL_UUID } from "uuid";
import { readonly, ref } from "vue";

export const useHistoryStore = defineStore("history", () => {
  const selectedSection = ref<number>(0);
  const selectedIndex = ref<number>(0);
  const selectedId = ref<string>(NIL_UUID);

  const updateSelected = (_selectedSection: number, _selectedIndex: number) => {
    selectedSection.value = _selectedSection;
    selectedIndex.value = _selectedIndex;
  };

  const updateSelectedId = (id: string) => {
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

import { defineStore } from "pinia";
import { readonly, ref } from "vue";

import type { StuffId } from "@common/types/Models";

export const useStuffStore = defineStore("stuff", () => {
  const MAX_ITEM_NUM = 50;

  const selected = ref(0);
  const selectedId = ref<StuffId>({ univCode: "", deptCode: "", stuffName: "" });
  const newStuffAmount = ref(0);

  const updateSelected = (newVal: number) => {
    selected.value = newVal;
  };

  const updateSelectedId = (id: StuffId) => {
    selectedId.value = id;
  };

  const resetNewStuffAmount = () => {
    newStuffAmount.value = 0;
  };

  const increaseNewStuffAmount = () => {
    if (newStuffAmount.value >= MAX_ITEM_NUM) return;
    newStuffAmount.value++;
  };

  const decreaseNewStuffAmount = () => {
    if (newStuffAmount.value <= 0) return;
    newStuffAmount.value--;
  };

  const $selected = readonly(selected);
  const $selectedId = readonly(selectedId);
  const $newStuffAmount = readonly(newStuffAmount);

  return {
    selected: $selected,
    selectedId: $selectedId,
    newStuffAmount: $newStuffAmount,
    updateSelected,
    updateSelectedId,
    resetNewStuffAmount,
    increaseNewStuffAmount,
    decreaseNewStuffAmount
  };
});

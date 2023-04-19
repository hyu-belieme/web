import type { List } from "immutable";
import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

import { type Loading, loading } from "@common/types/Loading";
import type { Stuff, StuffWithItems } from "@common/types/Models";

export const useStuffStore = defineStore("stuff", () => {
  const MAX_ITEM_NUM = 50;

  let _storeSelectedFlag = false;
  const reloadFlag = ref(false);
  const selected = ref(0);
  const stuffs = ref<List<Stuff> | Loading | undefined>(loading);
  const selectedStuffDetail = ref<StuffWithItems | Loading | undefined>(loading);
  const newStuffAmount = ref(0);

  const selectedStuff = computed(() => {
    if (stuffs.value === undefined) return undefined;
    if (stuffs.value === loading) return loading;
    if (stuffs.value.size <= selected.value) return undefined;
    return stuffs.value.get(selected.value);
  });

  const selectedStuffItems = computed(() => {
    if (selectedStuffDetail.value === undefined) return undefined;
    if (selectedStuffDetail.value === loading) return loading;
    return selectedStuffDetail.value.items;
  });

  const turnOnReloadFlag = (storeSelected: boolean = false) => {
    reloadFlag.value = true;
    _storeSelectedFlag = storeSelected;
  };

  const updateSelected = (newVal: number) => {
    selected.value = newVal;
  };

  const updateStuffs = (_stuffs: List<Stuff> | Loading | undefined) => {
    stuffs.value = _stuffs;
    if (!_storeSelectedFlag) updateSelected(0);
    reloadFlag.value = false;
  };

  const updateSelectedStuffDetail = (
    _selectedStuffDetail: StuffWithItems | Loading | undefined
  ) => {
    selectedStuffDetail.value = _selectedStuffDetail;
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

  const $reloadFlag = readonly(reloadFlag);
  const $selected = readonly(selected);
  const $stuffs = readonly(stuffs);
  const $selectedStuffDetail = readonly(selectedStuffDetail);
  const $newStuffAmount = readonly(newStuffAmount);

  return {
    reloadFlag: $reloadFlag,
    selected: $selected,
    stuffs: $stuffs,
    selectedStuffDetail: $selectedStuffDetail,
    newStuffAmount: $newStuffAmount,
    selectedStuff,
    selectedStuffItems,
    turnOnReloadFlag,
    updateSelected,
    updateStuffs,
    updateSelectedStuffDetail,
    resetNewStuffAmount,
    increaseNewStuffAmount,
    decreaseNewStuffAmount
  };
});

import type { List } from "immutable";
import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

import { type Loading, loading } from "@common/types/Loading";
import type { Stuff, StuffWithItems } from "@common/types/Models";

export const useStuffStore = defineStore("stuff", () => {
  const selected = ref(0);
  const stuffs = ref<List<Stuff> | Loading | undefined>(loading);
  const selectedStuffDetail = ref<StuffWithItems | Loading | undefined>(loading);

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

  const updateSelected = (newVal: number) => {
    selected.value = newVal;
  };

  const updateStuffs = (_stuffs: List<Stuff> | Loading | undefined) => {
    stuffs.value = _stuffs;
  };

  const updateSelectedStuffDetail = (
    _selectedStuffDetail: StuffWithItems | Loading | undefined
  ) => {
    selectedStuffDetail.value = _selectedStuffDetail;
  };

  const $selected = readonly(selected);
  const $stuffs = readonly(stuffs);
  const $selectedStuffDetail = readonly(selectedStuffDetail);

  return {
    selected: $selected,
    stuffs: $stuffs,
    selectedStuffDetail: $selectedStuffDetail,
    selectedStuff,
    selectedStuffItems,
    updateSelected,
    updateStuffs,
    updateSelectedStuffDetail
  };
});

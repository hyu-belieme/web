import type { List } from "immutable";
import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

import { type Loading, loading } from "@common/types/Loading";
import type { Stuff, StuffWithItems } from "@common/types/Models";

export const useStuffStore = defineStore("stuff", () => {
  const selected = ref(0);
  const stuffs = ref<List<Stuff> | Loading | undefined>(loading);
  const selectedStuffDetail = ref<StuffWithItems | Loading | undefined>(loading);
  const selectedStuffItems = computed(() => {
    if (selectedStuffDetail.value === undefined) return undefined;
    if (selectedStuffDetail.value === loading) return loading;
    return selectedStuffDetail.value.items;
  });

  const updateSelected = (newVal: number) => {
    selected.value = newVal;
  };

  const updateStuffs = (load: () => Promise<List<Stuff> | Loading | undefined>) => {
    stuffs.value = loading;

    load()
      .then((result) => {
        stuffs.value = result;
      })
      .catch((error) => {
        console.log(error);
        stuffs.value = undefined;
      });
  };

  const updateSelectedStuffDetail = (
    load: (_: Stuff) => Promise<StuffWithItems | Loading | undefined>
  ) => {
    const targetStuff = _selectedStuff();
    if (targetStuff === undefined) selectedStuffDetail.value = undefined;
    else if (targetStuff === loading) selectedStuffDetail.value = loading;
    else {
      load(targetStuff).then((result) => {
        selectedStuffDetail.value = result;
      });
    }
  };

  const _selectedStuff = () => {
    if (stuffs.value === undefined) return undefined;
    if (stuffs.value === loading) return loading;
    if (stuffs.value.size <= selected.value) return undefined;
    return stuffs.value.get(selected.value);
  };

  const $selected = readonly(selected);
  const $stuffs = readonly(stuffs);
  const $selectedStuffDetail = readonly(selectedStuffDetail);

  return {
    selected: $selected,
    stuffs: $stuffs,
    selectedStuffDetail: $selectedStuffDetail,
    selectedStuffItems,
    updateSelected,
    updateStuffs,
    updateSelectedStuffDetail
  };
});

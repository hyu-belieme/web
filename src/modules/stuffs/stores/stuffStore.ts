import { loading, type Loading } from "@common/types/Loading";
import type { Stuff, StuffWithItems } from "@common/types/Models";
import type { List } from "immutable";

import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useStuffStore = defineStore("stuff", () => {
  const selected = ref(0);
  const stuffs = ref<List<Stuff> | Loading | undefined>(loading);
  const selectedStuffDetail = ref<StuffWithItems | Loading | undefined>(loading);

  const selectedStuff = computed(() => {
    if (stuffs.value === undefined) return undefined;
    if (stuffs.value === loading) return loading;

    let unwrapped = stuffs.value as List<Stuff>;
    if (unwrapped.size <= selected.value) return undefined;
    return unwrapped.get(selected.value);
  });

  const selectedStuffItems = computed(() => {
    if (selectedStuffDetail.value === undefined) return undefined;
    if (selectedStuffDetail.value === loading) return loading;
    return (selectedStuffDetail.value as StuffWithItems).items;
  });

  function updateSelected(newVal: number) {
    selected.value = newVal;
  }

  function updateStuffs(strategy: StuffsGetStrategy) {
    stuffs.value = strategy.load();
  }

  function updateSelectedStuffDetail(strategy: StuffDetailGetStrategy) {
    if (selectedStuff.value === undefined) selectedStuffDetail.value = undefined;
    else if (selectedStuff.value === loading) selectedStuffDetail.value = loading;
    else selectedStuffDetail.value = strategy.load(selectedStuff.value as Stuff);
  }

  return {
    selected,
    stuffs,
    selectedStuffDetail,
    selectedStuffItems,
    selectedStuff,
    updateSelected,
    updateStuffs,
    updateSelectedStuffDetail
  };
});

interface StuffsGetStrategy {
  load: () => List<Stuff> | Loading | undefined;
}

interface StuffDetailGetStrategy {
  load: (_: Stuff) => StuffWithItems | Loading | undefined;
}

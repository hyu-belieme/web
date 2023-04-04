import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Stuff, StuffWithItems } from "@/models/Stuff";

interface StuffsGetStrategy {
  load: () => Stuff[];
}

interface StuffDetailGetStrategy {
  load: (_: Stuff) => Stuff[];
}

export const useStuffStore = defineStore("stuff", () => {
  const selected = ref<number | undefined>(undefined);
  const stuffs = ref<Stuff[] | undefined>(undefined);
  const selectedStuffDetail = ref<StuffWithItems | undefined>(undefined);

  const selectedStuff = computed(() => {
    if (stuffs.value == undefined || selected.value == undefined) return undefined;
    return stuffs.value[selected.value];
  });

  function updateSelected(newVal: number) {
    selected.value = newVal;
  }

  function updateStuffs(strategy: StuffsGetStrategy) {
    stuffs.value = strategy.load();
  }

  function updateSelectedStuffDetail(strategy: StuffDetailGetStrategy) {
    if (selectedStuff.value == undefined) return;
    selectedStuffDetail.value = strategy.load(selectedStuff.value);
  }

  return {
    selected,
    stuffs,
    selectedStuffDetail,
    selectedStuff,
    updateSelected,
    updateStuffs,
    updateSelectedStuffDetail
  };
});

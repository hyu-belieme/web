import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type Stuff from "@/models/stuff/Stuff";
import type StuffWithItems from "@/models/stuff/StuffWithItems";

export const useStuffStore = defineStore("stuff", () => {
  const selected = ref<number | undefined>(undefined);
  const stuffs = ref<Stuff[] | undefined>(undefined);
  const selectedStuffDetail = ref<StuffWithItems | undefined>(undefined);

  const selectedStuff = computed(() => {
    if (stuffs.value == undefined || selected.value == undefined) return undefined;
    return stuffs.value[selected.value];
  });

  const selectedStuffItems = computed(() => {
    if (selectedStuffDetail.value == undefined) return [];
    return selectedStuffDetail.value.items;
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
    selectedStuffItems,
    selectedStuff,
    updateSelected,
    updateStuffs,
    updateSelectedStuffDetail
  };
});

interface StuffsGetStrategy {
  load: () => Stuff[] | undefined;
}

interface StuffDetailGetStrategy {
  load: (_: Stuff) => StuffWithItems | undefined;
}

import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useStuffStore = defineStore("stuff", () => {
  const selected = ref(undefined);
  const stuffs = ref(undefined);
  const selectedStuffDetail = ref(undefined);

  const selectedStuff = computed(() => {
    if (stuffs.value == undefined || selected.value == undefined) return undefined;
    return stuffs.value[selected.value];
  });

  function updateSelected(newVal) {
    selected.value = newVal;
  }

  function updateStuffs(strategy) {
    stuffs.value = strategy.load();
  }

  function updateSelectedStuffDetail(strategy) {
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

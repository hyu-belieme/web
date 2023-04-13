import { defineStore } from "pinia";
import { readonly, ref } from "vue";

type StuffDetailViewModeStore = "SHOW" | "ADD" | "EDIT";

export const useStuffDetailViewModeStore = defineStore("stuffDetailViewMode", () => {
  const stuffDetailViewMode = ref<StuffDetailViewModeStore>("SHOW");
  const _stuffDetailViewMode = readonly(stuffDetailViewMode);

  function changeStuffDetailViewMode(mode: StuffDetailViewModeStore) {
    stuffDetailViewMode.value = mode;
  }

  return {
    stuffDetailViewMode: _stuffDetailViewMode,
    changeStuffDetailViewMode
  };
});

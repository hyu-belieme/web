import { defineStore } from "pinia";
import { readonly, ref } from "vue";

type DetailStuffViewModeStore = "SHOW" | "ADD" | "EDIT";

export const useDetailStuffViewModeStore = defineStore("detailStuffViewMode", () => {
  const detailStuffViewMode = ref<DetailStuffViewModeStore>("SHOW");
  const _detailStuffViewMode = readonly(detailStuffViewMode);

  function changeDetailStuffViewMode(mode: DetailStuffViewModeStore) {
    detailStuffViewMode.value = mode;
  }

  return {
    detailStuffViewMode: _detailStuffViewMode,
    changeDetailStuffViewMode
  };
});

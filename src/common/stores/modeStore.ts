import { defineStore } from "pinia";
import { readonly, ref } from "vue";

type DetailStuffMode = "SHOW" | "ADD" | "EDIT";

export const useModeStore = defineStore("mode", () => {
  const detailStuffMode = ref<DetailStuffMode>("SHOW");
  const _detailStuffMode = readonly(detailStuffMode);

  function changeDetailStuffMode(mode: DetailStuffMode) {
    detailStuffMode.value = mode;
  }

  return {
    detailStuffMode: _detailStuffMode,
    changeDetailStuffMode
  };
});

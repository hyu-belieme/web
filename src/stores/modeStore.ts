import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

type Mode = "SHOW" | "ADD" | "EDIT";

export const useModeStore = defineStore("mode", () => {
  const _detailStuffMode = ref<Mode>("SHOW");
  const detailStuffMode = readonly(_detailStuffMode);

  function changeMode(mode: Mode) {
    _detailStuffMode.value = mode;
  }

  return {
    detailStuffMode,
    changeMode
  };
});

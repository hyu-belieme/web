import { defineStore } from "pinia";
import { readonly, ref } from "vue";

type UserMode = "USER" | "STAFF" | "MASTER";
type DetailStuffMode = "SHOW" | "ADD" | "EDIT";

export const useModeStore = defineStore("mode", () => {
  const userMode = ref<UserMode>("USER");
  const _userMode = readonly(userMode);

  const detailStuffMode = ref<DetailStuffMode>("SHOW");
  const _detailStuffMode = readonly(detailStuffMode);

  function changeDetailStuffMode(mode: DetailStuffMode) {
    detailStuffMode.value = mode;
  }

  function changeUserMode(mode: UserMode) {
    userMode.value = mode;
  }

  return {
    detailStuffMode: _detailStuffMode,
    userMode: _userMode,
    changeDetailStuffMode,
    changeUserMode
  };
});

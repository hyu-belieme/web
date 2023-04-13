import { defineStore } from "pinia";
import { readonly, ref } from "vue";

type UserMode = "USER" | "STAFF" | "MASTER";

export const useUserModeStore = defineStore("userMode", () => {
  const userMode = ref<UserMode>("USER");
  const _userMode = readonly(userMode);

  function changeUserMode(mode: UserMode) {
    userMode.value = mode;
  }

  return {
    userMode: _userMode,
    changeUserMode
  };
});

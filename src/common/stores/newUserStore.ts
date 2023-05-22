import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

import userDummy from "@common/assets/dummies/newUserDummy";
import type { UserWithSecureInfo } from "@common/types/Models";

type UserMode = "USER" | "STAFF" | "MASTER";

export const useUserStore = defineStore("newUser", () => {
  const user = ref<UserWithSecureInfo>(userDummy);

  const userMode = ref<UserMode>("USER");

  const userToken = computed(() => {
    return user.value.token;
  });

  function updateUserMode(_userMode: UserMode) {
    userMode.value = _userMode;
  }

  function updateUser(_user: UserWithSecureInfo) {
    user.value = _user;
  }

  const $user = readonly(user);
  const $userMode = readonly(userMode);
  return {
    user: $user,
    userMode: $userMode,
    userToken,
    updateUser,
    updateUserMode
  };
});

import { defineStore } from "pinia";
import { NIL as NILL_UUID } from "uuid";
import { computed, readonly, ref } from "vue";

import userDummy from "@common/assets/dummies/userDummy";
import { type Loading, loading } from "@common/types/Loading";
import type { UserWithSecureInfo } from "@common/types/Models";

type UserMode = "USER" | "STAFF" | "MASTER";

export const useUserStore = defineStore("user", () => {
  const user = ref<UserWithSecureInfo | Loading | undefined>(userDummy);

  const userMode = ref<UserMode>("USER");

  const userToken = computed(() => {
    if (user.value === undefined || user.value === loading) return NILL_UUID;
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

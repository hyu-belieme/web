import { Map } from "immutable";
import { defineStore } from "pinia";
import { NIL as NILL_UUID, v4 as uuid4 } from "uuid";
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

  let _userModeBeforeChangeHandlers = Map<string, (newVal: UserMode, oldVal: UserMode) => void>();
  let _userModeAfterChangeHandlers = Map<string, (newVal: UserMode, oldVal: UserMode) => void>();

  function updateUserMode(_userMode: UserMode) {
    _userModeBeforeChangeHandlers.forEach((handler) => {
      handler(_userMode, userMode.value);
    });

    userMode.value = _userMode;

    _userModeAfterChangeHandlers.forEach((handler) => {
      handler(_userMode, userMode.value);
    });
  }

  function updateUser(_user: UserWithSecureInfo) {
    user.value = _user;
  }

  function addUserModeBeforeChangeHandler(handler: (newVal: UserMode, oldVal: UserMode) => void) {
    let key = uuid4();
    _userModeBeforeChangeHandlers = _userModeBeforeChangeHandlers.set(key, handler);
    return key;
  }

  function deleteUserModeBeforeChangeHandler(key: string) {
    _userModeBeforeChangeHandlers = _userModeBeforeChangeHandlers.delete(key);
  }

  function addUserModeAfterChangeHandler(handler: (newVal: UserMode, oldVal: UserMode) => void) {
    let key = uuid4();
    _userModeAfterChangeHandlers = _userModeAfterChangeHandlers.set(key, handler);
    return key;
  }

  function deleteUserModeAfterChangeHandler(key: string) {
    _userModeAfterChangeHandlers = _userModeAfterChangeHandlers.delete(key);
  }

  const $user = readonly(user);
  const $userMode = readonly(userMode);
  return {
    user: $user,
    userMode: $userMode,
    userToken,
    updateUser,
    updateUserMode,
    addUserModeBeforeChangeHandler,
    deleteUserModeBeforeChangeHandler,
    addUserModeAfterChangeHandler,
    deleteUserModeAfterChangeHandler
  };
});

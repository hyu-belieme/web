import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

import type UserMode from '@common/types/UserMode';

const key = 'user-mode';
const storageArea = localStorage;
const defaultVal = 'USER';

const useUserModeStorage = defineStore(key, () => {
  const userMode = useStorage<UserMode>(key, defaultVal, storageArea);

  function equals(mode: UserMode) {
    return userMode.value === mode;
  }

  function set(mode: UserMode) {
    userMode.value = mode;
  }

  function reset() {
    userMode.value = 'USER';
  }

  return {
    userMode,
    equals,
    set,
    reset,
  };
});
export default useUserModeStorage;

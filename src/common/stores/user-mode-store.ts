import { defineStore } from 'pinia';
import { readonly, ref } from 'vue';

import type UserMode from '@common/types/UserMode';

const useUserModeStore = defineStore('user-mode', () => {
  const userMode = ref<UserMode>('USER');

  function updateUserMode(_userMode: UserMode) {
    userMode.value = _userMode;
  }

  return {
    userMode: readonly(userMode),
    updateUserMode,
  };
});

export default useUserModeStore;

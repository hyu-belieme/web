import { defineStore } from 'pinia';
import { computed, readonly, ref } from 'vue';

import userDummy from '@common/assets/dummies/userDummy';
import type UserWithSecureInfo from '@common/models/UserWithSecureInfo';
import type UserMode from '@common/types/UserMode';

const useUserStore = defineStore('user', () => {
  const user = ref<UserWithSecureInfo>(userDummy);

  const userMode = ref<UserMode>('USER');

  const userToken = computed(() => {
    return user.value.token;
  });

  function updateUserMode(_userMode: UserMode) {
    userMode.value = _userMode;
  }

  function updateUser(_user: UserWithSecureInfo) {
    user.value = _user;
  }

  return {
    user: readonly(user),
    userMode: readonly(userMode),
    userToken,
    updateUser,
    updateUserMode,
  };
});

export default useUserStore;

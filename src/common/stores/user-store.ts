import { defineStore } from 'pinia';
import { readonly, ref } from 'vue';

import type User from '@common/models/User';
import { userInfoStorage, userTokenStorage } from '@common/webstorages/storages';

const useUserStore = defineStore('user', () => {
  const userToken = ref<string | undefined>(userTokenStorage.get());
  const user = ref<User | undefined>(userInfoStorage.get());

  function updateUserToken() {
    userToken.value = userTokenStorage.get();
  }

  function updateUser() {
    user.value = userInfoStorage.get();
  }

  return {
    userToken: readonly(userToken),
    user: readonly(user),
    updateUserToken,
    updateUser,
  };
});

export default useUserStore;

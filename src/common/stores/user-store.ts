import { defineStore } from 'pinia';
import { readonly, ref } from 'vue';

import type UserWithSecureInfo from '@common/models/UserWithSecureInfo';
import { userInfoStorage } from '@common/webstorages/storages';

const useUserStore = defineStore('user', () => {
  const user = ref<UserWithSecureInfo | undefined>(userInfoStorage.get());

  function updateUser() {
    user.value = userInfoStorage.get();
  }

  return {
    user: readonly(user),
    updateUser,
  };
});

export default useUserStore;

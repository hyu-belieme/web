import { defineStore } from 'pinia';
import { readonly, ref } from 'vue';

import type UserWithSecureInfo from '@common/models/UserWithSecureInfo';

function getUserInfo() {
  const userString = sessionStorage.getItem('user-info') || undefined;
  if (userString === undefined) return undefined;
  return JSON.parse(userString);
}

const useUserStore = defineStore('new-user', () => {
  const user = ref<UserWithSecureInfo | undefined>(getUserInfo());

  function updateUser() {
    user.value = getUserInfo();
  }

  return {
    user: readonly(user),
    updateUser,
  };
});

export default useUserStore;

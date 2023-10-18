import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';

import User from '@common/models/User';

const key = 'logged-in-user';
const storageArea = sessionStorage;
const defaultVal = User.NIL;

const useLoggedInUserStorage = defineStore(key, () => {
  const loggedInUser = useStorage<User>(key, defaultVal, storageArea);
  const loggedInUserId = computed(() => loggedInUser.value.id);

  function itemEquals(user: User) {
    return new User(loggedInUser.value).equals(user);
  }

  function setItem(user: User) {
    loggedInUser.value = user;
  }

  function removeItem() {
    loggedInUser.value = null;
  }

  return {
    loggedInUser,
    loggedInUserId,
    itemEquals,
    setItem,
    removeItem,
  };
});
export default useLoggedInUserStorage;

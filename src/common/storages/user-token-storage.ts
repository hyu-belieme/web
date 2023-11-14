import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { NIL as NIL_UUID } from 'uuid';
import { readonly } from 'vue';

const key = 'user-token';
const storageArea = localStorage;
const defaultVal = NIL_UUID;

const useUserTokenStorage = defineStore(key, () => {
  const userToken = useStorage<string>(key, defaultVal, storageArea);

  function itemEquals(token: string) {
    return userToken.value === token;
  }

  function setItem(token: string) {
    userToken.value = token;
  }

  function removeItem() {
    userToken.value = NIL_UUID;
  }

  return {
    userToken: readonly(userToken),
    itemEquals,
    setItem,
    removeItem,
  };
});
export default useUserTokenStorage;

import { defineStore } from 'pinia';
import { ref } from 'vue';

import type User from '@common/models/User';

interface UserFilterFunction {
  (e: User): boolean;
}

const useUserListFilter = defineStore('user-list-filter', () => {
  const filters = ref<Map<string, UserFilterFunction>>(new Map([]));

  function applyFilters(userList: User[]) {
    return userList.filter((e) => {
      let result = true;
      filters.value.forEach((f) => {
        result = result && f(e);
      });
      return result;
    });
  }

  function putFilter(key: string, filter: UserFilterFunction) {
    filters.value.set(key, filter);
  }

  function removeFilter(key: string) {
    filters.value.delete(key);
  }

  return {
    applyFilters,
    putFilter,
    removeFilter,
  };
});

export default useUserListFilter;

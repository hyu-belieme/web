import { defineStore } from 'pinia';
import { readonly, ref } from 'vue';

import type Department from '@common/models/Department';
import { deptStorage } from '@common/webstorages/storages';

const useDeptStore = defineStore('dept', () => {
  const dept = ref<Department | undefined>(deptStorage.get());

  function updateDept() {
    dept.value = deptStorage.get();
  }

  return {
    dept: readonly(dept),
    updateDept,
  };
});

export default useDeptStore;

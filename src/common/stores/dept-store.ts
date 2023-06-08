import { defineStore } from 'pinia';
import { readonly, ref } from 'vue';

import type Department from '@common/models/Department';
import { deptIdStorage, deptStorage } from '@common/webstorages/storages';

const useDeptStore = defineStore('dept', () => {
  const deptId = ref<string | undefined>(deptIdStorage.get());
  const dept = ref<Department | undefined>(deptStorage.get());

  function updateDeptId() {
    deptId.value = deptIdStorage.get();
  }

  function updateDept() {
    dept.value = deptStorage.get();
  }

  return {
    deptId: readonly(deptId),
    dept: readonly(dept),
    updateDeptId,
    updateDept,
  };
});

export default useDeptStore;

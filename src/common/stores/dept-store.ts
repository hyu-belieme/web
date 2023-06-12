import { defineStore } from 'pinia';
import { computed, readonly, ref } from 'vue';

import type Department from '@common/models/Department';
import { deptStorage } from '@common/webstorages/storages';

const useDeptStore = defineStore('dept', () => {
  const dept = ref<Department | undefined>(deptStorage.get());
  const deptId = computed(() => dept.value?.id);

  function updateDept() {
    dept.value = deptStorage.get();
  }

  return {
    dept: readonly(dept),
    deptId,
    updateDept,
  };
});

export default useDeptStore;

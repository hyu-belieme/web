import { defineStore } from 'pinia';
import { readonly, ref } from 'vue';

import { deptIdStorage } from '@common/webstorages/storages';

const useDeptStore = defineStore('dept', () => {
  const deptId = ref<string | undefined>(deptIdStorage.get());

  function updateDeptId() {
    deptId.value = deptIdStorage.get();
  }

  return {
    deptId: readonly(deptId),
    updateDeptId,
  };
});

export default useDeptStore;

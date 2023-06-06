import { defineStore } from 'pinia';
import { readonly, ref } from 'vue';

const useDeptStore = defineStore('dept', () => {
  const deptId = ref<string | undefined>(localStorage.getItem('dept-id') || undefined);

  function updateDeptId() {
    deptId.value = localStorage.getItem('dept-id') || undefined;
  }

  return {
    deptId: readonly(deptId),
    updateDeptId,
  };
});

export default useDeptStore;

import { defineStore } from 'pinia';
import { readonly, ref } from 'vue';

const useDeptStore = defineStore('dept', () => {
  const deptId = ref<string>('35334234-3731-4231-4545-304134383143');

  return {
    deptId: readonly(deptId),
  };
});

export default useDeptStore;

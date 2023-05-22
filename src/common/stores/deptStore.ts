import { defineStore } from "pinia";
import { readonly, ref } from "vue";

export const useDeptStore = defineStore("dept", () => {
  const deptId = ref<string>("35334234-3731-4231-4545-304134383143");

  const $deptId = readonly(deptId);
  return {
    deptId: $deptId
  };
});

import { defineStore } from "pinia";
import { readonly, ref } from "vue";

import type { DepartmentId } from "@common/types/Models";

export const useDeptStore = defineStore("dept", () => {
  const deptId = ref<DepartmentId>({
    univCode: "HYU",
    deptCode: "CSE"
  });

  const $deptId = readonly(deptId);
  return {
    deptId: $deptId
  };
});

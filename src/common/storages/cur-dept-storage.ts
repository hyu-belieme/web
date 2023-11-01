import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';

import Department from '@common/models/Department';

const key = 'cur-dept';
const storageArea = localStorage;
const defaultVal = Department.NIL;

const useCurDeptStorage = defineStore(key, () => {
  const curDept = useStorage<Department>(key, defaultVal, storageArea);
  const curDeptId = computed(() => curDept.value.id);

  function itemEquals(dept: Department) {
    return new Department(curDept.value).equals(dept);
  }

  function setItem(dept: Department) {
    curDept.value = dept;
  }

  function removeItem() {
    curDept.value = null;
  }

  return {
    curDept,
    curDeptId,
    itemEquals,
    setItem,
    removeItem,
  };
});
export default useCurDeptStorage;

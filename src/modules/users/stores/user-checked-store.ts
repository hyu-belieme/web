import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type User from '@common/models/User';

const useUserChecked = defineStore('user-checked', () => {
  const userList = ref<User[]>([]);
  const checkedUserIds = ref<Set<string>>(new Set([]));

  const repChecked = computed(() => {
    if (userList.value.length === 0 || checkedUserIds.value.size === 0) return 'unchecked';
    if (userList.value.length === checkedUserIds.value.size) return 'checked';
    return 'indeterminate';
  });

  const userWithCheckedList = computed(() =>
    userList.value.map((user) => ({
      user,
      checked: checkedUserIds.value.has(user.id),
    }))
  );

  const checkedUsers = computed(() =>
    userList.value.filter((user) => checkedUserIds.value.has(user.id))
  );

  function isChecked(userId: string) {
    return checkedUserIds.value.has(userId);
  }

  function updateUserList(_userList: User[]) {
    const tmpUserList: User[] = [];
    const tmpCheckedUserIds = new Set<string>();
    _userList.forEach((e) => {
      tmpUserList.push(e);
      if (checkedUserIds.value.has(e.id)) tmpCheckedUserIds.add(e.id);
    });
    userList.value = tmpUserList;
    checkedUserIds.value = tmpCheckedUserIds;
    userList.value.sort((a, b) => a.compare(b));
  }

  function check(userId: string) {
    if (userList.value.findIndex((e) => e.id === userId) === -1) return;
    checkedUserIds.value.add(userId);
  }

  function uncheck(userId: string) {
    checkedUserIds.value.delete(userId);
  }

  function checkAll() {
    checkedUserIds.value = new Set<string>(userList.value.map((e) => e.id));
  }

  function uncheckAll() {
    checkedUserIds.value = new Set<string>();
  }

  return {
    repChecked,
    userWithCheckedList,
    checkedUsers,
    isChecked,
    updateUserList,
    check,
    uncheck,
    checkAll,
    uncheckAll,
  };
});

export default useUserChecked;

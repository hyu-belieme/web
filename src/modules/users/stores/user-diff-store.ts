import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import UserDiffDummies from '@common/dummies/UserDiffDummies';

import type UserDiff from '@^users/models/UserDiff';
import { compare } from '@^users/models/types/UserDiffType';

const useUserDiff = defineStore('user-diff', () => {
  const tmpUserDiffDummies = new Map<string, UserDiff>();
  UserDiffDummies.forEach((userDiff) => {
    tmpUserDiffDummies.set(userDiff.user.id, userDiff);
  });

  const userDiffsMap = ref<Map<string, UserDiff>>(tmpUserDiffDummies);

  const userDiffList = computed(() =>
    Array.from(userDiffsMap.value.values()).sort((a, b) => {
      const cmpDiffType = compare(a.diffType(), b.diffType());
      if (cmpDiffType === 0) {
        return a.user.compare(b.user);
      }
      return cmpDiffType;
    })
  );

  function getUserDiff(userId: string): UserDiff | undefined {
    return userDiffsMap.value.get(userId);
  }

  function clearUserDiffs() {
    userDiffsMap.value.clear();
  }

  function putUserDiff(userDiff: UserDiff) {
    userDiffsMap.value.set(userDiff.user.id, userDiff);
  }

  function removeUserDiff(userId: string) {
    userDiffsMap.value.delete(userId);
  }

  return {
    userDiffList,
    getUserDiff,
    clearUserDiffs,
    putUserDiff,
    removeUserDiff,
  };
});

export default useUserDiff;

<template>
  <section v-if="sortedUserDiffList.length !== 0" class="w-100 h-100 d-flex flex-column">
    <UserDiffListCell
      v-for="userDiff of sortedUserDiffList"
      :user-diff="userDiff"
      :key="userDiff.user.id"
    ></UserDiffListCell>
  </section>
  <section v-else class="w-100 h-100 position-relative">
    <span class="position-absolute start-50 top-50 translate-middle text-gray fw-semibold">
      변경사항이 없습니다.
    </span>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import UserDiffListCell from '@^users/components/UserDiffListCell.vue';
import { compare } from '@^users/models/types/UserDiffType';
import useUserDiff from '@^users/stores/user-diff-store';

const userDiffStore = useUserDiff();
const { userDiffList } = storeToRefs(userDiffStore);

const sortedUserDiffList = computed(() => {
  return userDiffList.value
    .map((e) => e)
    .sort((a, b) => {
      const cmpDiffType = compare(a.diffType(), b.diffType());
      if (cmpDiffType === 0) {
        return a.user.compare(b.user);
      }
      return cmpDiffType;
    });
});
</script>

<style scoped lang="scss"></style>

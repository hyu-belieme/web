<template>
  <section class="user-diff-list">
    <section class="w-100 flex-grow-0">
      <section class="border-bottom d-flex flex-row align-items-center px-2">
        <section
          class="px-1 py-2 w-0 flex-grow-1 d-flex flex-row align-items-center justify-content-between"
        >
          <span class="lh-sm">변경사항</span>
        </section>
      </section>
    </section>
    <section class="w-100 h-0 flex-grow-1">
      <section v-if="true" class="w-100 h-100 d-flex flex-column">
        <UserDiffListCell
          v-for="userDiff of userDiffList"
          :user-diff="userDiff"
          :key="userDiff.user.id"
        ></UserDiffListCell>
      </section>
      <section v-else class="w-100 h-100 position-relative">
        <span class="position-absolute start-50 top-50 translate-middle text-gray fw-semibold">
          변경사항이 없습니다.
        </span>
      </section>
    </section>
    <!-- <section class="w-100 flex-grow-0 p-2 d-flex flex-row gap-2 justify-content-center">
      <BasicButton content="저장하기" size="sm"></BasicButton>
      <BasicButton content="되돌리기" color="light" size="sm"></BasicButton>
    </section> -->
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';

import UserDiffListCell from '@^users/components/UserDiffListCell.vue';
import useUserDiff from '@^users/stores/user-diff-store';

const userDiffStore = useUserDiff();
const { userDiffList } = storeToRefs(userDiffStore);
</script>

<style scoped lang="scss">
.user-diff-list {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  background-color: $white;

  border: $border-width solid $border-color;
  @include border-radius();
}
</style>

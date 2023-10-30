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
          :user="
            new User({
              id: '2018008886',
              name: '이석환',
              university: new University({
                id: 'HYU',
                name: '한양대학교',
              }),
              studentId: '2018008886',
              entranceYear: 2018,
              authorities: List([]),
            })
          "
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
import { List } from 'immutable';

import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import University from '@common/models/University';
import User from '@common/models/User';

import UserDiffListCell from '@^users/components/UserDiffListCell.vue';
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

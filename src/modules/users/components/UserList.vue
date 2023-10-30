<template>
  <section class="user-list">
    <section class="w-100 flex-grow-0">
      <UserListHeader></UserListHeader>
    </section>
    <section class="w-100 h-0 flex-grow-1 d-flex flex-column">
      <UserListCell
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
      ></UserListCell>
      <UserListCell
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
      ></UserListCell>
      <UserListCell
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
      ></UserListCell>
    </section>
    <section class="w-100 flex-grow-0 p-2 d-flex flex-row gap-2 justify-content-center">
      <BasicButton content="저장하기" size="sm"></BasicButton>
      <BasicButton content="되돌리기" color="light" size="sm"></BasicButton>
    </section>
  </section>
</template>

<script setup lang="ts">
import { List } from 'immutable';

import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import University from '@common/models/University';
import User from '@common/models/User';

import UserListCell from '@^users/components/UserListCell.vue';
import UserListHeader from '@^users/components/UserListHeader.vue';
</script>

<style scoped lang="scss">
.user-list {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  background-color: $white;

  border: $border-width solid $border-color;
  @include border-radius();
}
</style>

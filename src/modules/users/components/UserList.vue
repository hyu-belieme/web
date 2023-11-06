<template>
  <section class="user-list">
    <section class="w-100 flex-grow-0">
      <UserListHeader></UserListHeader>
    </section>
    <section class="w-100 h-0 flex-grow-1 d-flex flex-column">
      <UserListCell
        v-for="cellInfo of userWithCheckedList"
        :key="cellInfo.user.id + cellInfo.user.getPermission(curDeptId)"
        :user="cellInfo.user"
        :checked="cellInfo.checked"
      ></UserListCell>
    </section>
    <section class="w-100 flex-grow-0 p-2 d-flex flex-row gap-2 justify-content-center">
      <BasicButton content="저장하기" size="sm"></BasicButton>
      <BasicButton content="새로고침" color="light" size="sm"></BasicButton>
    </section>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import userDummies from '@common/dummies/UserDummies';
import useCurDeptStorage from '@common/storages/cur-dept-storage';

import UserListCell from '@^users/components/UserListCell.vue';
import UserListHeader from '@^users/components/UserListHeader.vue';
import useUserChecked from '@^users/stores/user-checked-store';
import useUserDiff from '@^users/stores/user-diff-store';
import userDiffApplier from '@^users/utils/user-diff-applier';

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);

const userDiffStore = useUserDiff();
const { userDiffList } = storeToRefs(userDiffStore);

const userCheckedStore = useUserChecked();
const { userWithCheckedList } = storeToRefs(userCheckedStore);

watch(
  userDiffList,
  (newVal) => userCheckedStore.updateUserList(userDiffApplier(userDummies, newVal)),
  { immediate: true }
);
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

  overflow: scroll;
}
</style>

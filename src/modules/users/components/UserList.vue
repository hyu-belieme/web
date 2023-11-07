<template>
  <section class="user-list">
    <section class="w-100 flex-grow-0">
      <UserListHeader></UserListHeader>
    </section>
    <section class="w-100 h-0 flex-grow-1 d-flex flex-column">
      <UserListCell
        v-for="cellInfo of applyUserListFilter()"
        :key="cellInfo.user.id + cellInfo.user.getPermission(curDeptId)"
        :user="cellInfo.user"
        :checked="cellInfo.checked"
      ></UserListCell>
    </section>
    <section class="w-100 flex-grow-0 p-2 d-flex flex-row gap-2 justify-content-center">
      <BasicButton content="저장하기" size="sm"></BasicButton>
      <BasicButton
        content="새로고침"
        color="light"
        size="sm"
        @click="() => modalStore.addModal(reloadModal)"
      ></BasicButton>
    </section>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import ConfirmModal from '@common/components/modals/ConfirmModal/ConfirmModal.vue';
import useModalStore from '@common/components/modals/stores/modal-store';
import userDummies from '@common/dummies/UserDummies';
import useCurDeptStorage from '@common/storages/cur-dept-storage';

import UserListCell from '@^users/components/UserListCell.vue';
import UserListHeader from '@^users/components/UserListHeader.vue';
import useUserChecked from '@^users/stores/user-checked-store';
import useUserDiff from '@^users/stores/user-diff-store';
import useUserListFilter from '@^users/stores/user-list-filter-store';
import userDiffApplier from '@^users/utils/user-diff-applier';

const modalStore = useModalStore();

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);

const userDiffStore = useUserDiff();
const { userDiffList } = storeToRefs(userDiffStore);

const userCheckedStore = useUserChecked();
const { userWithCheckedList } = storeToRefs(userCheckedStore);

const userListFilterStore = useUserListFilter();

const reloadModal = {
  component: ConfirmModal,
  props: {
    title: '사용자 리스트 새로고침',
    content: '저장하지 않은 변경사항은 모두 사라집니다. 그래도 사용자 리스트를 다시 불러올까요?',
    resolveLabel: '불러오기',
    rejectLabel: '뒤로가기',
  },
  resolve: () => {
    userDiffStore.clearUserDiffs();
    modalStore.removeModal();
  },
  reject: () => {
    modalStore.removeModal();
  },
};

function applyUserListFilter() {
  const onlyUserList = userWithCheckedList.value.map((e) => e.user);
  const filteredUserList = userListFilterStore.applyFilters(onlyUserList);
  return filteredUserList.map((e) => ({
    user: e,
    checked: userCheckedStore.isChecked(e.id),
  }));
}

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

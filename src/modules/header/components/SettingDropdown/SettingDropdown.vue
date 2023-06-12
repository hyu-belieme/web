<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import useModalStore from '@common/stores/modal-store';
import useUserModeStore from '@common/stores/user-mode-store';
import { userInfoStorage, userTokenStorage } from '@common/webstorages/storages';

import ChangeDepartmentModal from '@^header/components/ChangeDepartmentModal/ChangeDepartmentModal.vue';

const modalStore = useModalStore();

const userModeStore = useUserModeStore();
const { userMode } = storeToRefs(userModeStore);

const changeDeptModal = {
  key: 'changeDept',
  component: ChangeDepartmentModal,
  props: {
    title: '학과 변경하기',
  },
};

const changeUserModeLabel = computed(() =>
  userMode.value === 'USER' ? '관리자 모드로' : '사용자 모드로'
);

function changeUserMode() {
  if (userMode.value === 'USER') userModeStore.updateUserMode('STAFF');
  else userModeStore.updateUserMode('USER');
}

function logout() {
  userInfoStorage.remove();
  userTokenStorage.remove();
}
</script>

<template>
  <ul class="dropdown-menu">
    <li class="dropdown-item">내 정보</li>
    <li class="dropdown-item" @click="modalStore.addModal(changeDeptModal)">학과 변경하기</li>
    <li class="dropdown-item" @click="changeUserMode()">{{ changeUserModeLabel }}</li>
    <li><hr class="dropdown-divider" /></li>
    <li><a class="dropdown-item" @click="logout()" href="/login">로그아웃</a></li>
  </ul>
</template>

<style lang="scss" scoped></style>

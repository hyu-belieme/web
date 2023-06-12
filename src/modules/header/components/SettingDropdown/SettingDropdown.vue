<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import useUserModeStore from '@common/stores/user-mode-store';
import { userInfoStorage, userTokenStorage } from '@common/webstorages/storages';

const userModeStore = useUserModeStore();
const { userMode } = storeToRefs(userModeStore);

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
    <li class="dropdown-item">학과 변경하기</li>
    <li class="dropdown-item" @click="changeUserMode()">{{ changeUserModeLabel }}</li>
    <li><hr class="dropdown-divider" /></li>
    <li><a class="dropdown-item" @click="logout()" href="/login">로그아웃</a></li>
  </ul>
</template>

<style lang="scss" scoped></style>

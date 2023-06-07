<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import useUserModeStore from '@common/stores/user-mode-store';

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
  sessionStorage.removeItem('user-info');
  localStorage.removeItem('user-token');
}
</script>

<template>
  <section class="flex-grow-0">
    <img class="logo" src="@common/assets/images/belieme_logo_en.png" />
  </section>
  <nav class="flex-grow-1 d-flex flex-row align-items-center ms-5">
    <RouterLink to="/stuffs" class="m-4">물품목록</RouterLink>
    <RouterLink to="/histories" class="m-4">대여기록</RouterLink>
    <RouterLink to="/bulletin" class="m-4">문의게시판</RouterLink>
    <RouterLink to="/users" class="m-4">유저관리</RouterLink>
  </nav>
  <section class="flex-grow-0">
    <i class="icon bi bi-person" data-bs-toggle="dropdown" aria-expanded="false"></i>
    <ul class="dropdown-menu">
      <li class="dropdown-item">내 정보</li>
      <li class="dropdown-item">학과 이동하기</li>
      <li class="dropdown-item" @click="changeUserMode()">{{ changeUserModeLabel }}</li>
      <li><hr class="dropdown-divider" /></li>
      <li><a class="dropdown-item" @click="logout()" href="/login">로그아웃</a></li>
    </ul>
  </section>
</template>

<style lang="scss">
.logo {
  height: $header-font-size * $header-line-height;
}

.icon {
  font-size: $header-font-size * 1.3;
}

nav a {
  display: inline-block;
  text-decoration: none;
  font-weight: 600;
  color: $body-color;
}

nav a.router-link-exact-active {
  color: $primary;
}
</style>

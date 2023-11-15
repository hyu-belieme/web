<template>
  <nav class="flex-grow-1 d-flex flex-row align-items-center ms-4">
    <RouterLink v-if="isLoggedIn" to="/stuffs" class="ms-4 me-4">물품목록</RouterLink>
    <RouterLink v-if="isLoggedIn" to="/histories" class="ms-4 me-4">대여기록</RouterLink>
    <RouterLink
      v-if="isLoggedIn && hasHigherAuthorityPermission(getPermissionOfLoggedInUser(), 'MASTER')"
      to="/users"
      class="ms-4 me-4"
    >
      유저관리
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { hasHigherAuthorityPermission } from '@common/models/types/AuthorityPermission';
import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useLoggedInUserStorage from '@common/storages/logged-in-user-storage';

const route = useRoute();

const { curDeptId } = storeToRefs(useCurDeptStorage());

const loggedInUserStorage = useLoggedInUserStorage();

const isLoggedIn = computed(() => {
  return !(route.path === '/' || route.path.startsWith('/login'));
});

function getPermissionOfLoggedInUser() {
  return loggedInUserStorage.getPermissionOfLoggedInUser(curDeptId.value || '');
}
</script>

<style scoped lang="scss">
nav a {
  display: inline-block;
  text-decoration: none;
  font-weight: 600;
  color: $body-color;

  &:hover {
    color: $gray-700;
  }
}

nav a.router-link-exact-active {
  color: $primary;
}
</style>

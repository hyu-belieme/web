<template>
  <nav class="flex-grow-1 d-flex flex-row align-items-center ms-4">
    <RouterLink
      v-if="isLoggedIn"
      to="/stuffs"
      :class="['ms-4', 'me-4', route.path.startsWith('/stuffs') ? 'active' : '']"
      >물품목록</RouterLink
    >
    <RouterLink
      v-if="isLoggedIn"
      to="/histories"
      :class="['ms-4', 'me-4', route.path.startsWith('/histories') ? 'active' : '']"
      >대여기록</RouterLink
    >
    <RouterLink
      v-if="
        isLoggedIn && hasHigherAuthorityPermission(loggedInUser.getPermission(curDeptId), 'MASTER')
      "
      to="/users"
      :class="['ms-4', 'me-4', route.path.startsWith('/users') ? 'active' : '']"
    >
      유저관리
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import type User from '@common/models/User';
import { hasHigherAuthorityPermission } from '@common/models/types/AuthorityPermission';

defineProps<{
  loggedInUser: User;
  curDeptId: string;
}>();

const route = useRoute();

const isLoggedIn = computed(() => {
  return !(route.path === '/' || route.path.startsWith('/login'));
});
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

nav a.active {
  color: $primary;
}
</style>

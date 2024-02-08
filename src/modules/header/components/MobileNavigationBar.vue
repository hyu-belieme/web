<template>
  <nav class="d-flex flex-row align-items-center gap-2">
    <RouterLink
      v-if="isLoggedIn"
      to="/stuffs"
      :class="['navigation-cell', route.path.startsWith('/stuffs') ? 'active' : '']"
    >
      물품목록
    </RouterLink>
    <RouterLink
      v-if="isLoggedIn"
      to="/histories"
      :class="['navigation-cell', route.path.startsWith('/histories') ? 'active' : '']"
    >
      대여기록
    </RouterLink>
    <RouterLink
      v-if="
        isLoggedIn && hasHigherAuthorityPermission(loggedInUser.getPermission(curDeptId), 'MASTER')
      "
      to="/users"
      :class="['navigation-cell', route.path.startsWith('/users') ? 'active' : '']"
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
.navigation-cell {
  width: 0;
  flex-grow: 1;

  padding-top: map-get($spacers, 2);
  padding-bottom: map-get($spacers, 2);

  text-align: center;
}

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
  border-bottom: $border-width solid $primary;
}
</style>

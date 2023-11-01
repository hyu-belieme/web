<template>
  <section class="d-flex flex-row align-items-center px-2">
    <DiffTypeBadge class="mx-1" :state="userDiff.diffType()"></DiffTypeBadge>
    <section
      class="light-border-bottom px-1 py-2 w-0 flex-grow-1 d-flex flex-row align-items-center justify-content-between"
    >
      <section class="d-flex flex-row align-items-baseline gap-1">
        <span class="lh-sm">{{ userDiff.user.name }}</span>
        <span class="lh-sm text-gray fs-xs">
          {{ userDiff.user.university.name }} / {{ userDiff.user.studentId }}
        </span>
      </section>
      <section class="permission-change lh-sm text-gray fs-xs">
        <span v-if="userDiff.prevState !== 'NIL'">
          {{ permissionToString(userDiff.prevState) }}
        </span>
        <span v-if="userDiff.curState !== 'NIL'">
          {{ permissionToString(userDiff.curState) }}
        </span>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { toString as permissionToString } from '@common/models/types/AuthorityPermission';

import DiffTypeBadge from '@^users/components/DiffTypeBadge.vue';
import type UserDiff from '@^users/models/UserDiff';

defineProps<{
  userDiff: UserDiff;
}>();
</script>

<style scoped lang="scss">
.light-border-bottom {
  border-bottom: calc($border-width * 0.5) solid $border-color;
}

.permission-change {
  span::after {
    content: '→';
    margin: 0 map-get($spacers, 1);
  }

  span:last-child::after {
    content: '';
  }
}
</style>

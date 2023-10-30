<template>
  <section class="d-flex flex-row align-items-center px-2">
    <DiffTypeBadge class="mx-1" state="deleted"></DiffTypeBadge>
    <section
      class="light-border-bottom px-1 py-2 w-0 flex-grow-1 d-flex flex-row align-items-center justify-content-between"
    >
      <section class="d-flex flex-row align-items-baseline gap-1">
        <span class="lh-sm">{{ user.name }}</span>
        <span class="lh-sm text-gray fs-xs">
          {{ user.university.name }} / {{ user.studentId }}
        </span>
      </section>
      <span class="lh-sm text-gray fs-xs"> staff → user </span>
    </section>
  </section>
</template>

<script setup lang="ts">
import type User from '@common/models/User';

import DiffTypeBadge from '@^users/components/DiffTypeBadge.vue';

defineProps<{
  user: User;
}>();
</script>

<style scoped lang="scss">
.light-border-bottom {
  border-bottom: calc($border-width * 0.5) solid $border-color;
}
</style>

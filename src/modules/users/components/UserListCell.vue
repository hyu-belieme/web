<template>
  <section class="d-flex flex-row align-items-center px-2">
    <BasicCheckbox class="mx-1" name="user-checkbox"></BasicCheckbox>
    <section
      class="light-border-bottom px-1 py-2 w-0 flex-grow-1 d-flex flex-row align-items-center justify-content-between"
    >
      <section class="d-flex flex-row align-items-baseline gap-1">
        <span class="lh-sm">{{ user.name }}</span>
        <span class="lh-sm text-gray fs-xs">
          {{ user.university.name }} / {{ user.studentId }}
        </span>
      </section>
      <BasicSelector
        class="authority-selector"
        size="xs"
        :disabled="false"
        :options="
          Map({
            banned: {
              label: 'banned',
              value: 'banned',
            },
            user: {
              label: 'user',
              value: 'user',
            },
            staff: {
              label: 'staff',
              value: 'staff',
            },
            master: {
              label: 'master',
              value: 'master',
            },
          })
        "
        initial-key="user"
      ></BasicSelector>
    </section>
  </section>
</template>

<script setup lang="ts">
import { Map } from 'immutable';

import BasicCheckbox from '@common/components/checkboxes/BasicCheckbox/BasicCheckbox.vue';
import BasicSelector from '@common/components/selectors/BasicSelector/BasicSelector.vue';
import type User from '@common/models/User';

defineProps<{
  user: User;
}>();
</script>

<style scoped lang="scss">
.authority-selector {
  width: 5rem;
}

.subinfo {
  color: $gray;
}

.light-border-bottom {
  border-bottom: calc($border-width * 0.5) solid $border-color;
}
</style>

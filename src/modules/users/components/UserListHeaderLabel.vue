<template>
  <section class="d-flex flex-row align-items-center px-2">
    <BasicCheckbox class="mx-1" name="user-checkbox"></BasicCheckbox>
    <section
      class="px-1 py-1 w-0 flex-grow-1 d-flex flex-row align-items-center justify-content-between"
    >
      <section class="d-flex flex-row align-items-baseline gap-1">
        <span class="lh-sm">이름</span>
        <span class="lh-sm text-gray fs-xs">학교/학과</span>
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
      ></BasicSelector>
    </section>
  </section>
</template>

<script setup lang="ts">
import { Map } from 'immutable';

import BasicCheckbox from '@common/components/checkboxes/BasicCheckbox/BasicCheckbox.vue';
import BasicSelector from '@common/components/selectors/BasicSelector/BasicSelector.vue';
</script>

<style scoped lang="scss">
.authority-selector {
  width: 5rem;
}

.subinfo {
  color: $gray;
}
</style>

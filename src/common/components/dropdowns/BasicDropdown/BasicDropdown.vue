<script setup lang="ts">
import { ref } from 'vue';

import DropdownBase from '@common/components/dropdowns/DropdownBase/DropdownBase.vue';

withDefaults(
  defineProps<{
    type?: 'hover' | 'toggle';
    align?: 'left' | 'right';
    opened?: boolean;
    disabled?: boolean;
  }>(),
  {
    type: 'hover',
    align: 'left',
    opened: false,
    disabled: false,
  }
);

const dropdownBaseRef = ref<InstanceType<typeof DropdownBase> | null>(null);

defineExpose({
  openedRef: () => dropdownBaseRef.value?.openedRef(),
});
</script>
<template>
  <DropdownBase ref="dropdownBaseRef" :type="type" :opened="opened" :disabled="disabled">
    <template v-slot:trigger>
      <slot name="trigger"></slot>
    </template>
    <template v-slot:menu="{ closeDropdown }">
      <ul
        ref="dropdownBody"
        :class="['dropdown-menu', align + '-aligned', dropdownBaseRef?.openedRef() ? 'show' : '']"
      >
        <slot name="menu" :closeDropdown="closeDropdown"></slot>
      </ul>
    </template>
  </DropdownBase>
</template>

<style scoped lang="scss">
@import '@common/components/dropdowns/styles/main';

.right-aligned {
  right: 0;
}

.left-aligned {
  left: 0;
}
</style>

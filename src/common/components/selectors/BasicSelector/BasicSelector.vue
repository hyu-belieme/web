<template>
  <TriggerWidthDropdown
    class="selector-dropdown"
    ref="dropdownRef"
    v-bind:align="'right'"
    v-bind:type="'toggle'"
    :disabled="disabled"
  >
    <template v-slot:trigger>
      <section class="pb-1">
        <BasicSelectorTrigger
          :state="
            disabled ? 'disabled' : dropdownRef?.openedRef() === true ? 'focused' : 'unfocused'
          "
          :content="options.get(selectedKey)?.label ?? '-'"
        ></BasicSelectorTrigger>
      </section>
    </template>
    <template v-slot:menu="{ closeDropdown }">
      <li v-for="option of options" :key="option[0]" class="w-100">
        <span
          class="dropdown-item py-1 px-1 lh-sm fs-xsm"
          @click="
            () => {
              selectedKey = option[0];
              closeDropdown();
            }
          "
        >
          {{ option[1].label }}
        </span>
      </li>
    </template>
  </TriggerWidthDropdown>
</template>

<script setup lang="ts">
import type { Map } from 'immutable';
import { ref } from 'vue';

import TriggerWidthDropdown from '@common/components/dropdowns/TriggerWidthDropdown/TriggerWidthDropdown.vue';
import BasicSelectorTrigger from '@common/components/selectors/BasicSelector/BasicSelectorTrigger.vue';

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    initialKey?: string;
    options: Map<string, { label: string; value: string }>;
  }>(),
  {
    disabled: false,
    initialKey: '',
  }
);

const dropdownRef = ref<InstanceType<typeof TriggerWidthDropdown> | null>(null);
const selectedKey = ref<string>(props.initialKey);

defineExpose({
  selectedValue: () => props.options?.get(selectedKey.value)?.value,
  selectedLabel: () => props.options?.get(selectedKey.value)?.label,
});
</script>

<style scoped lang="scss"></style>

<template>
  <TriggerWidthDropdown
    class="selector-dropdown"
    ref="dropdownRef"
    v-bind:align="'right'"
    v-bind:type="'toggle'"
    :disabled="disabled"
  >
    <template v-slot:trigger>
      <section>
        <BasicSelectorTrigger
          :size="size"
          :state="
            disabled ? 'disabled' : dropdownRef?.openedRef() === true ? 'focused' : 'unfocused'
          "
          :content="options.get(selectedKey)?.label ?? hint"
        ></BasicSelectorTrigger>
      </section>
    </template>
    <template v-slot:menu="{ closeDropdown }">
      <li v-for="option of options" :key="option[0]" class="w-100">
        <span
          :class="['dropdown-item', 'py-1', 'px-1', 'lh-sm', 'fs-' + size]"
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
import { ref, watch } from 'vue';

import TriggerWidthDropdown from '@common/components/dropdowns/TriggerWidthDropdown/TriggerWidthDropdown.vue';
import BasicSelectorTrigger from '@common/components/selectors/BasicSelector/BasicSelectorTrigger.vue';

const props = withDefaults(
  defineProps<{
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    disabled?: boolean;
    initialKey?: string;
    hint?: string;
    options: Map<string, { label: string; value: any }>;
  }>(),
  {
    size: 'md',
    disabled: false,
    hint: '-',
    initialKey: '',
  }
);

const emit = defineEmits<{
  (e: 'onInit', newKey: string): void;
  (e: 'onChange', keys: { newKey: string; oldKey: string }): void;
}>();

const dropdownRef = ref<InstanceType<typeof TriggerWidthDropdown> | null>(null);
const selectedKey = ref<string>(props.initialKey);

emit('onInit', selectedKey.value);
watch(selectedKey, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    emit('onChange', { newKey: newVal, oldKey: oldVal });
  }
});

defineExpose({
  select: (key: string) => {
    selectedKey.value = key;
  },
  selectedValue: () => props.options?.get(selectedKey.value)?.value,
  selectedLabel: () => props.options?.get(selectedKey.value)?.label,
  getValue: (key: string) => props.options?.get(key)?.value,
  getLabel: (key: string) => props.options?.get(key)?.label,
});
</script>

<style scoped lang="scss"></style>

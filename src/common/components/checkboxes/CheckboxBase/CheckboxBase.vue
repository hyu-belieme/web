<template>
  <label class="position-relative">
    <input
      ref="inputRef"
      class="d-none"
      type="checkbox"
      :name="name"
      :value="value"
      :disabled="disabled"
    />
    <section
      :class="[
        'checkbox-frame',
        size !== '' ? 'checkbox-frame-' + size : '',
        !customDisabled && disabled ? 'checkbox-frame-disabled' : '',
      ]"
    >
      <section class="on-unchecked w-100 h-100">
        <slot v-if="customDisabled && disabled" name="on-unchecked-disabled"></slot>
        <slot v-else name="on-unchecked"></slot>
      </section>
      <section class="on-checked w-100 h-100">
        <slot v-if="customDisabled && disabled" name="on-checked-disabled"></slot>
        <slot v-else name="on-checked"></slot>
      </section>
      <section class="on-indeterminate w-100 h-100">
        <slot v-if="customDisabled && disabled" name="on-indeterminate-disabled"></slot>
        <slot v-else name="on-indeterminate"></slot>
      </section>
    </section>
  </label>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    name: string;
    value?: string;
    size?: string;
    disabled?: boolean;
    customDisabled?: boolean;
    initState?: 'checked' | 'unchecked' | 'indeterminate' | undefined;
  }>(),
  {
    value: 'on',
    size: '',
    disabled: false,
    customDisabled: false,
    initState: undefined,
  }
);

const emit = defineEmits<{
  (e: 'onInit', checked: boolean): void;
  (e: 'onChange', checked: boolean): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);
onMounted(() => {
  if (inputRef.value === null) return;
  if (props.initState !== undefined) {
    inputRef.value.checked = props.initState === 'checked';
    inputRef.value.indeterminate = props.initState === 'indeterminate';
  }

  emit('onInit', inputRef.value.checked);
  if (inputRef.value !== null) {
    inputRef.value.onchange = () => {
      emit('onChange', inputRef.value?.checked || false);
    };
  }
  watch(
    () => inputRef.value?.checked || false,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        emit('onChange', newVal);
      }
    }
  );
});

defineExpose({
  check() {
    if (inputRef.value !== null) {
      inputRef.value.indeterminate = false;
      inputRef.value.checked = true;
    }
  },
  uncheck() {
    if (inputRef.value !== null) {
      inputRef.value.indeterminate = false;
      inputRef.value.checked = false;
    }
  },
  indeterminate() {
    if (inputRef.value !== null) inputRef.value.indeterminate = true;
  },
  determinate() {
    if (inputRef.value !== null) inputRef.value.indeterminate = false;
  },
  isChecked() {
    return inputRef.value?.checked;
  },
  isIndeterminate() {
    return inputRef.value?.indeterminate;
  },
});
</script>

<style scoped lang="scss">
$checkbox-size-base: 1rem;
.checkbox-frame {
  width: $checkbox-size-base;
  height: $checkbox-size-base;

  .on-unchecked {
    display: block;
  }

  .on-checked,
  .on-indeterminate {
    display: none;
  }

  @each $key, $value in $size-ratios {
    &-#{$key} {
      width: $checkbox-size-base * $value;
      height: $checkbox-size-base * $value;
    }
  }

  &-disabled {
    // filter: brightness(0.8);
    opacity: 0.7;
  }
}

input:checked + .checkbox-frame {
  .on-checked {
    display: block;
  }

  .on-unchecked,
  .on-indeterminate {
    display: none;
  }
}

input:indeterminate + .checkbox-frame {
  .on-indeterminate {
    display: block;
  }

  .on-unchecked,
  .on-checked {
    display: none;
  }
}
</style>

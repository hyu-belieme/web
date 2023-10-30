<template>
  <label class="position-relative">
    <input
      class="d-none"
      type="checkbox"
      :name="name"
      :value="value"
      :checked="initState === 'checked'"
      :indeterminate="initState === 'indeterminate'"
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
withDefaults(
  defineProps<{
    name: string;
    value?: string;
    size?: string;
    disabled?: boolean;
    customDisabled?: boolean;
    initState?: 'checked' | 'unchecked' | 'indeterminate';
  }>(),
  {
    value: 'on',
    size: '',
    disabled: false,
    customDisabled: false,
    initState: 'unchecked',
  }
);
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

  &-disabled {
    // filter: brightness(0.8);
    opacity: 0.7;
  }

  &-xsm {
    width: $checkbox-size-base * 0.75;
    height: $checkbox-size-base * 0.75;
  }

  &-sm {
    width: $checkbox-size-base * 0.875;
    height: $checkbox-size-base * 0.875;
  }

  &-lg {
    width: $checkbox-size-base * 1.25;
    height: $checkbox-size-base * 1.25;
  }

  &-xlg {
    width: $checkbox-size-base * 1.5;
    height: $checkbox-size-base * 1.5;
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

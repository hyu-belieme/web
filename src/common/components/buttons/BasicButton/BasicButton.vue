<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    content?: string;
    color?: string;
    size?: '' | 'sm' | 'lg';
  }>(),
  {
    content: '',
    color: 'primary',
    size: '',
  }
);

const isContentTooShort = props.content.length <= 3;
let btnSizeClassPostfix = '';
if (isContentTooShort) {
  btnSizeClassPostfix += '-more-x-padding';
}
</script>

<template>
  <button
    :class="[
      'btn',
      'btn-' + (color === '' ? 'primary' : color),
      (size === '' ? 'btn' : 'btn-' + size) + btnSizeClassPostfix,
    ]"
  >
    {{ content }}
  </button>
</template>

<style scoped lang="scss">
@import '../styles/main';

.btn-gray {
  $btn-gray-base-background: $gray-100;
  $btn-gray-base-border-border: $gray-200;
  @include button-variant(
    $background: $gray-100,
    $border: $btn-gray-base-border-border,
    $hover-background: $gray-300,
    $hover-border: $btn-gray-base-border-border,
    $active-background: shade-color($btn-gray-base-background, $btn-active-bg-tint-amount),
    $active-border: $btn-gray-base-border-border,
    $disabled-background: $gray-50,
    $disabled-border: $btn-gray-base-border-border
  );
}
</style>

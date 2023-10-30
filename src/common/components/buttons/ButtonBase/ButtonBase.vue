<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: string;
    size?: string;
    disabled?: boolean;
  }>(),
  {
    color: 'primary',
    size: '',
    disabled: false,
  }
);
</script>

<template>
  <button
    :class="[
      'btn',
      'btn-' + (color === '' ? 'primary' : color),
      size === '' ? 'btn' : 'btn-' + size,
    ]"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
@import '../styles/main';
</style>

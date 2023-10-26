<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: string;
    size?: string;
  }>(),
  {
    color: 'primary',
    size: '',
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
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
@import '../styles/main';
</style>

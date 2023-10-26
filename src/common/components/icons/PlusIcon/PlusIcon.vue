<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: 'dark' | 'light';
    multiplier?: number;
  }>(),
  {
    color: 'light',
    multiplier: 1,
  }
);
</script>

<template>
  <svg
    :width="`${1.5 * multiplier}rem`"
    :height="`${1.5 * multiplier}rem`"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :class="`color-${color}`"
      d="M3 12H21"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      :class="`color-${color}`"
      d="M12 3V21"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style lang="scss" scoped>
.color-dark {
  stroke: $dark;
}

.color-light {
  stroke: $white;
}
</style>

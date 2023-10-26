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
      d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z"
      stroke="#2E2C2D"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: string;
    multiplier?: number;
  }>(),
  {
    color: 'dark',
    multiplier: 1,
  }
);
</script>

<style scoped lang="scss">
.color-dark {
  stroke: $dark;
}

@for $i from 1 to 9 {
  .color-gray-#{$i * 100} {
    stroke: map-get($grays, '#{$i * 100}');
  }
}

.color-gray {
  stroke: $gray-700;
}

.color-light {
  stroke: $white;
}
</style>

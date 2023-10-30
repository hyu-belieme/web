<script setup lang="ts">
withDefaults(
  defineProps<{
    hover?: 'on' | 'off';
    color?: string;
    multiplier?: number;
  }>(),
  {
    hover: 'on',
    color: 'dark',
    multiplier: 1,
  }
);
</script>

<template>
  <svg
    :class="`color-${color}-hover-${hover}`"
    :width="`${1.5 * multiplier}rem`"
    :height="`${1.5 * multiplier}rem`"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path class="stroke-color" d="M5 12H19" stroke-width="5" stroke-linecap="round" />
  </svg>
</template>

<style lang="scss" scoped>
$component-prefix: 'minus-icon';

@each $color, $value in $theme-colors {
  .color-#{$color}-hover-on {
    --#{$prefix}--#{$component-prefix}-color: #{$value};
    &:hover {
      --#{$prefix}--#{$component-prefix}-color: #{hover-color($value)};
    }
  }

  .color-#{$color}-hover-off {
    --#{$prefix}--#{$component-prefix}-color: #{$value};
  }
}

@each $color, $value in $colors {
  .color-#{$color}-hover-on {
    --#{$prefix}--#{$component-prefix}-color: #{$value};
    &:hover {
      --#{$prefix}--#{$component-prefix}-color: #{hover-color($value)};
    }
  }

  .color-#{$color}-hover-off {
    --#{$prefix}--#{$component-prefix}-color: #{$value};
  }
}

.stroke-color {
  stroke: var(--#{$prefix}--#{$component-prefix}-color);
}
</style>

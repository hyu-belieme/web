<script setup lang="ts">
withDefaults(
  defineProps<{
    hover?: 'on' | 'off';
    color?: string;
    size?: '100' | 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  }>(),
  {
    hover: 'on',
    color: 'dark',
    size: 'md',
  }
);
</script>

<template>
  <svg
    :class="[`color-${color}-hover-${hover}`, `size-${size}`]"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="stroke-color"
      d="M3 12H21"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="stroke-color"
      d="M12 3V21"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style lang="scss" scoped>
$component-prefix: 'plus-icon';
$size-base: 1.5;

.size-100 {
  width: 100%;
  height: 100%;
}

.size-auto {
  width: auto;
  height: auto;
}

@each $key, $value in $size-ratios {
  .size-#{$key} {
    width: #{$size-base * $value}rem;
    height: #{$size-base * $value}rem;
  }
}

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

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
      class="fill-color"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.4808 17.7364C12.6606 18.5552 11.3321 18.5552 10.5105 17.7364L1.4173 8.63898C0.595651 7.81875 0.232828 5.67004 2.82906 5.67004H21.1651C23.8488 5.67004 23.3985 7.81734 22.5768 8.63898L13.4808 17.7364Z"
    />
  </svg>
</template>

<style lang="scss" scoped>
$component-prefix: 'triangle-icon';
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

.fill-color {
  fill: var(--#{$prefix}--#{$component-prefix}-color);
}
</style>

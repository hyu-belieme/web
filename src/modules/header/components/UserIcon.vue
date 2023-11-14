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
    viewBox="0 0 30 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="stroke-color"
      d="M18 18.7023C18 15.6706 14.5 15 12 15C9.5 15 6 15.6706 6 18.7023M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9Z"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="fill-color"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M26.8084 13.6951C26.6376 13.8657 26.3608 13.8657 26.1896 13.6951L24.2952 11.7998C24.124 11.6289 24.0484 11.1813 24.5893 11.1813H28.4093C28.9684 11.1813 28.8746 11.6286 28.7034 11.7998L26.8084 13.6951Z"
    />
  </svg>
</template>
<style lang="scss">
$component-prefix: 'user-icon';
$size-base-x: 1.875;
$size-base-y: 1.5;

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
    width: #{$size-base-x * $value}rem;
    height: #{$size-base-y * $value}rem;
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

.stroke-color {
  stroke: var(--#{$prefix}--#{$component-prefix}-color);
}
</style>

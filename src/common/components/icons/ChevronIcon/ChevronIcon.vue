<script setup lang="ts">
withDefaults(
  defineProps<{
    hover?: 'on' | 'off';
    color?: string;
    size?: '100' | 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    direction: 'left' | 'right' | 'up' | 'down';
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
    :class="[`color-${color}-hover-${hover}`, `size-${size}`, `direction-${direction}`]"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="fill-color"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.32666 3.03023C5.89111 3.43251 5.89111 4.08481 6.32666 4.48709L14.4609 12L6.32666 19.5129C5.89111 19.9153 5.89111 20.5675 6.32666 20.9698L7.11534 21.6983C7.55089 22.1006 8.25714 22.1006 8.69269 21.6983L18.01 13.0926C18.6633 12.4893 18.6633 11.5108 18.01 10.9073L8.69269 2.30179C8.25714 1.89941 7.55089 1.89941 7.11534 2.30179L6.32666 3.03023Z"
    />
  </svg>
</template>

<style lang="scss" scoped>
$component-prefix: 'check-icon';
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

.direction-left {
  transform: rotate(180deg);
}

.direction-right {
  transform: rotate(0deg);
}

.direction-up {
  transform: rotate(270deg);
}

.direction-down {
  transform: rotate(90deg);
}
</style>

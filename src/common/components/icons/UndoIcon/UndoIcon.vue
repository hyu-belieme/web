<script setup lang="ts">
withDefaults(
  defineProps<{
    hover?: 'on' | 'off';
    color?: string;
    size?: '100' | 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    half?: boolean;
  }>(),
  {
    hover: 'on',
    color: 'dark',
    size: 'md',
    half: false,
  }
);
</script>

<template>
  <!-- <svg
    :class="[`color-${color}-hover-${hover}`, half ? `size-${size}-half` : `size-${size}`]"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="fill-color"
      d="M19.5838 3.82574C19.9275 4.1691 20.2477 4.54413 20.5444 4.95099C20.8412 5.35786 21.0972 5.79478 21.3126 6.26181C21.528 6.72884 21.6964 7.22207 21.8179 7.74151C21.9393 8.26095 22 8.7993 22 9.3566C22 9.89834 21.941 10.4534 21.823 11.0219C21.705 11.5904 21.5102 12.1705 21.2387 12.7624C20.9672 13.3543 20.6058 13.9601 20.1543 14.5798C19.7029 15.1996 19.1438 15.8305 18.4771 16.4725C18.2617 16.6798 18.0165 16.9161 17.7416 17.1814C17.4666 17.4467 17.175 17.7276 16.8668 18.0241C16.5586 18.3206 16.2436 18.6254 15.9216 18.9387C15.5997 19.2519 15.2841 19.5545 14.9747 19.8465C14.2599 20.5354 13.5152 21.2532 12.7407 22L10.5204 19.8164C11.2857 19.0763 12.0258 18.3618 12.7407 17.673C13.0432 17.3809 13.357 17.08 13.6825 16.7701C14.0078 16.4602 14.3246 16.1554 14.6328 15.8555C14.9409 15.5557 15.2325 15.2731 15.5075 15.0078C15.7825 14.7426 16.0276 14.5063 16.243 14.2989C17.116 13.4473 17.7731 12.6019 18.2141 11.7626C18.6552 10.9232 18.8758 10.1068 18.8758 9.31316C18.8758 8.71348 18.7503 8.13499 18.4994 7.57764C18.2485 7.02034 17.8653 6.49421 17.3497 5.9993C17.2214 5.87446 17.0622 5.75631 16.872 5.64485C16.6818 5.53339 16.467 5.43586 16.2275 5.35228C15.9881 5.26865 15.7269 5.20068 15.4439 5.14827C15.1609 5.09591 14.8613 5.0697 14.5451 5.0697C14.2243 5.0697 13.8887 5.10148 13.5381 5.16499C13.1875 5.22855 12.8329 5.33332 12.4743 5.47935C12.1157 5.62533 11.7537 5.81652 11.3882 6.05283C11.0227 6.28913 10.6647 6.57784 10.3142 6.91891L7.97356 9.20951L11.6374 12.7842H2V3.55492L5.64326 7.03595L7.99419 4.73532C8.51657 4.16464 9.05735 3.69979 9.61641 3.34087C10.1755 2.98196 10.734 2.70333 11.292 2.50489C11.8499 2.3065 12.405 2.17274 12.9572 2.10365C13.5094 2.03452 14.0388 2 14.5451 2C15.0698 2 15.5756 2.04511 16.0625 2.13538C16.5495 2.22571 17.0078 2.35278 17.4374 2.5166C17.867 2.68047 18.2623 2.87384 18.6232 3.09676C18.984 3.31974 19.3042 3.56273 19.5838 3.82574Z"
    />
  </svg> -->
  <!-- <svg
    :class="[`color-${color}-hover-${hover}`, half ? `size-${size}-half` : `size-${size}`]"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="stroke-color"
      d="M4 10H17C19.2091 10 21 11.7909 21 14C21 16.2091 19.2091 18 17 18H12"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="stroke-color"
      d="M7 6L3 10L7 14"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> -->
  <svg
    :class="[`color-${color}-hover-${hover}`, half ? `size-${size}-half` : `size-${size}`]"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="fill-color"
      d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM13.92 16.63H9C8.59 16.63 8.25 16.29 8.25 15.88C8.25 15.47 8.59 15.13 9 15.13H13.92C15.2 15.13 16.25 14.09 16.25 12.8C16.25 11.51 15.21 10.47 13.92 10.47H8.85L9.11 10.73C9.4 11.02 9.4 11.5 9.11 11.79C8.96 11.94 8.77 12.01 8.58 12.01C8.39 12.01 8.2 11.94 8.05 11.79L6.48 10.22C6.19 9.93 6.19 9.45 6.48 9.16L8.05 7.59C8.34 7.3 8.82 7.3 9.11 7.59C9.4 7.88 9.4 8.36 9.11 8.65L8.77 8.98H13.92C16.03 8.98 17.75 10.7 17.75 12.81C17.75 14.92 16.03 16.63 13.92 16.63Z"
    />
  </svg>
</template>

<style lang="scss" scoped>
$component-prefix: 'undo-icon';
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

  .size-#{$key}-half {
    width: #{$size-base * $value * 0.5}rem;
    height: #{$size-base * $value * 0.5}rem;
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

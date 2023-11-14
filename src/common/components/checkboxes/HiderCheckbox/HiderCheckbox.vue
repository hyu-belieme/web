<script setup lang="ts">
withDefaults(
  defineProps<{
    state: 'showed' | 'hidden';
    hover?: 'on' | 'off';
    color?: string;
    size?: '100' | 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  }>(),
  {
    state: 'hidden',
    hover: 'on',
    color: 'dark',
    size: 'md',
  }
);
</script>

<template>
  <svg
    v-if="state === 'hidden'"
    :class="[`color-${color}-hover-${hover}`, `size-${size}`]"
    viewBox="0 0 24 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="fill-color"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M21.3982 2.32642C20.996 1.89087 20.3437 1.89087 19.9414 2.32642L12.4284 10.4607L4.91552 2.32642C4.51321 1.89087 3.86094 1.89087 3.45864 2.32642L2.73019 3.1151C2.32789 3.55065 2.32789 4.2569 2.73019 4.69245L11.3358 14.0097C11.9392 14.6631 12.9177 14.6631 13.5211 14.0097L22.1267 4.69245C22.5291 4.2569 22.5291 3.55065 22.1267 3.1151L21.3982 2.32642Z"
    />
  </svg>
  <svg
    v-else
    :class="[`color-${color}-hover-${hover}`, `size-${size}`]"
    viewBox="0 0 24 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="fill-color"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.45869 13.6733C3.86097 14.1089 4.51328 14.1089 4.91556 13.6733L12.4285 5.53908L19.9414 13.6733C20.3437 14.1089 20.996 14.1089 21.3983 13.6733L22.1267 12.8847C22.529 12.4491 22.529 11.7429 22.1267 11.3073L13.5211 1.99003C12.9177 1.33666 11.9393 1.33666 11.3358 1.99003L2.73026 11.3073C2.32787 11.7429 2.32787 12.4491 2.73026 12.8847L3.45869 13.6733Z"
    />
  </svg>
</template>

<style scoped lang="scss">
$component-prefix: 'hider-checkbox';
$size-base-x: 1.5;
$size-base-y: 1;

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
</style>

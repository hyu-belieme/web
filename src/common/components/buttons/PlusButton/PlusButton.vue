<script lang="ts" setup>
withDefaults(
  defineProps<{
    hover?: 'on' | 'off';
    color?: string;
    size?: '100' | 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    half?: boolean;
    disabled?: boolean;
    onClick?: () => void;
  }>(),
  {
    hover: 'on',
    color: 'dark',
    size: 'md',
    disabled: false,
    half: false,
    onClick: () => {},
  }
);
</script>

<template>
  <svg
    :class="[
      `color-${color}-hover-${hover}`,
      half ? `size-${size}-half` : `size-${size}`,
      disabled ? 'disabled' : '',
    ]"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    @click="onClick()"
  >
    <rect class="fill-bg-color" x="2" y="2" width="20" height="20" rx="10" />
    <rect class="fill-color" x="7" y="11" width="10" height="2" rx="1" />
    <rect
      class="fill-color"
      x="13"
      y="7"
      width="10"
      height="2"
      transform="rotate(90 13 7)"
      rx="1"
    />
  </svg>
</template>

<style lang="scss" scoped>
$component-prefix: 'plus-button';
$size-base: 2;

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
    --#{$prefix}--#{$component-prefix}-bg-color: #{$value};
    --#{$prefix}--#{$component-prefix}-color: #{color-contrast($value)};

    &:hover {
      --#{$prefix}--#{$component-prefix}-bg-color: #{hover-color($value)};
    }

    &.disabled {
      --#{$prefix}--#{$component-prefix}-bg-color: #{tint-color($value, 40%)};
    }
  }

  .color-#{$color}-hover-off {
    --#{$prefix}--#{$component-prefix}-bg-color: #{$value};
    --#{$prefix}--#{$component-prefix}-color: #{color-contrast($value)};

    &.disabled {
      --#{$prefix}--#{$component-prefix}-bg-color: #{tint-color($value, 40%)};
    }
  }
}

@each $color, $value in $colors {
  .color-#{$color}-hover-on {
    --#{$prefix}--#{$component-prefix}-bg-color: #{$value};
    --#{$prefix}--#{$component-prefix}-color: #{color-contrast($value)};

    &:hover {
      --#{$prefix}--#{$component-prefix}-bg-color: #{hover-color($value)};
    }

    &.disabled {
      --#{$prefix}--#{$component-prefix}-bg-color: #{tint-color($value, 40%)};
    }
  }

  .color-#{$color}-hover-off {
    --#{$prefix}--#{$component-prefix}-bg-color: #{$value};
    --#{$prefix}--#{$component-prefix}-color: #{color-contrast($value)};

    &.disabled {
      --#{$prefix}--#{$component-prefix}-bg-color: #{tint-color($value, 40%)};
    }
  }
}

.fill-bg-color {
  fill: var(--#{$prefix}--#{$component-prefix}-bg-color);
}

.fill-color {
  fill: var(--#{$prefix}--#{$component-prefix}-color);
}
</style>

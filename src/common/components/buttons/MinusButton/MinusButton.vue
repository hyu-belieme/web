<script lang="ts" setup>
withDefaults(
  defineProps<{
    hover?: 'on' | 'off';
    color?: string;
    size?: '100' | 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    disabled?: boolean;
    onClick?: () => void;
  }>(),
  {
    hover: 'on',
    color: 'dark',
    size: 'md',
    disabled: false,
    onClick: () => {},
  }
);
</script>

<template>
  <svg
    :class="[`color-${color}-hover-${hover}`, `size-${size}`, disabled ? 'disabled' : '']"
    :viewBox="`0 0 16 16`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    @click="onClick()"
  >
    <rect class="fill-bg-color" :x="0.5" :y="0.5" :width="15" :height="15" :rx="7.5" />
    <rect class="fill-color" :x="4" :y="7.25" :width="8" :height="1.5" />
  </svg>
</template>

<style lang="scss" scoped>
$component-prefix: 'minus-button';
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

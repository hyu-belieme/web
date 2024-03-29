<script lang="ts" setup>
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
    viewBox="0 0 8 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="fill-color"
      d="M2 12C2 11.6044 2.1173 11.2178 2.33706 10.8889C2.55682 10.56 2.86918 10.3036 3.23463 10.1522C3.60009 10.0009 4.00222 9.96126 4.39018 10.0384C4.77814 10.1156 5.13451 10.3061 5.41421 10.5858C5.69392 10.8655 5.8844 11.2219 5.96157 11.6098C6.03874 11.9978 5.99913 12.3999 5.84776 12.7654C5.69638 13.1308 5.44004 13.4432 5.11114 13.6629C4.78224 13.8827 4.39556 14 4 14C3.46957 14 2.96086 13.7893 2.58579 13.4142C2.21071 13.0391 2 12.5304 2 12ZM4 22C4.39556 22 4.78224 21.8827 5.11114 21.6629C5.44004 21.4432 5.69638 21.1308 5.84776 20.7654C5.99913 20.3999 6.03874 19.9978 5.96157 19.6098C5.8844 19.2219 5.69392 18.8655 5.41421 18.5858C5.13451 18.3061 4.77814 18.1156 4.39018 18.0384C4.00222 17.9613 3.60009 18.0009 3.23463 18.1522C2.86918 18.3036 2.55682 18.56 2.33706 18.8889C2.1173 19.2178 2 19.6044 2 20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22ZM4 6C4.39556 6 4.78224 5.8827 5.11114 5.66294C5.44004 5.44318 5.69638 5.13082 5.84776 4.76537C5.99913 4.39991 6.03874 3.99778 5.96157 3.60982C5.8844 3.22186 5.69392 2.86549 5.41421 2.58579C5.13451 2.30608 4.77814 2.1156 4.39018 2.03843C4.00222 1.96126 3.60009 2.00087 3.23463 2.15224C2.86918 2.30362 2.55682 2.55996 2.33706 2.88886C2.1173 3.21776 2 3.60444 2 4C2 4.53043 2.21071 5.03914 2.58579 5.41421C2.96086 5.78929 3.46957 6 4 6Z"
    />
  </svg>
</template>

<style lang="scss" scoped>
$component-prefix: 'three-dots-icon';
$size-base-x: 0.5;
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
</style>

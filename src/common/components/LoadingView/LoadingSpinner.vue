<script setup lang="ts">
withDefaults(
  defineProps<{
    spin?: boolean;
    size?: '100' | 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  }>(),
  {
    spin: true,
    size: 'md',
  }
);
</script>

<template>
  <svg
    :class="[spin ? 'spin-animation' : '', `size-${size}`]"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle class="stroke-gray" cx="32" cy="32" r="28" stroke-width="8" />
    <path
      class="stroke-primary"
      d="M58.3688 22.5826C60.0409 27.2644 60.4363 32.307 59.5144 37.1922C58.5925 42.0774 56.3866 46.6291 53.1232 50.3796"
      stroke-width="8"
    />
  </svg>
</template>

<style scoped lang="scss">
$size-base: 4;

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

.spin-animation {
  @keyframes rotate_image {
    100% {
      transform: rotate(360deg);
    }
  }
  animation: rotate_image 1.5s linear infinite;
}

.stroke-gray {
  stroke: $gray-200;
}

.stroke-primary {
  stroke: $primary;
}
</style>

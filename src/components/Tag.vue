<script setup lang="ts">
import { defineProps } from "vue";
defineProps<{
  color: {
    type: String;
    required: true;
  };
  size: {
    type: String;
    required: true;
  };
  content: {
    type: String;
    required: true;
  };
}>();
</script>

<template>
  <div :class="['tag-' + color + '-' + size]">{{ content }}</div>
</template>

<style lang="scss" scoped>
$colors: (
  "blue": #c2ebff,
  "indigo": #c2c6ff,
  "purple": #d8c2ff,
  "pink": #ffc2fa,
  "red": #ffc2c2,
  "orange": #ffd6c2,
  "yellow": #fffac2,
  "green": #ccffc2,
  "cyan": #c2ffed
);

$tag-font-sizes: (
  1: $h1-font-size,
  2: $h2-font-size,
  3: $h3-font-size,
  4: $h4-font-size,
  5: $h5-font-size,
  6: $h6-font-size
);

@each $color-key in map-keys($colors) {
  $color: map-get($colors, $color-key);
  @each $font-size-key in map-keys($tag-font-sizes) {
    $font-size: map-get($font-sizes, $font-size-key);
    $tag-height: $font-size * 1.5;

    .tag-#{$color-key}-#{$font-size-key} {
      background-color: $color;
      font-size: $font-size;

      width: $font-size * 5;
      height: $tag-height;

      font-weight: 300;
      text-align: center;
    }
  }
}
</style>

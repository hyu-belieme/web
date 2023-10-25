<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    content?: string;
    size?: '' | 'sm' | 'lg';
    selected?: boolean;
  }>(),
  {
    content: '',
    size: '',
    selected: false,
    underline: 'none',
  }
);

const isContentTooShort = props.content.length <= 3;
let btnSizeClassPostfix = '';
if (isContentTooShort) {
  btnSizeClassPostfix += '-more-x-padding';
}
</script>

<template>
  <button
    :class="[
      'btn',
      'text-btn',
      selected ? 'selected' : '',
      (size === '' ? 'btn' : 'btn-' + size) + btnSizeClassPostfix,
    ]"
  >
    {{ content }}
  </button>
</template>

<style scoped lang="scss">
@import '../styles/main';

.text-btn {
  @include button-variant(
    $background: transparent,
    $border: transparent,
    $color: $gray-900,
    $hover-background: transparent,
    $hover-border: transparent,
    $hover-color: $gray-700,
    $active-background: transparent,
    $active-border: transparent,
    $active-color: $gray-400,
    $disabled-background: transparent,
    $disabled-border: transparent
  );
  --#{$prefix}btn-border-radius-top-start: 0;
  --#{$prefix}btn-border-radius-top-end: 0;
  --#{$prefix}btn-border-radius-bottom-end: 0;
  --#{$prefix}btn-border-radius-bottom-start: 0;

  font-weight: $font-weight-bold;
}

.selected {
  @include button-variant(
    $background: transparent,
    $border: transparent,
    $color: $primary,
    $hover-background: transparent,
    $hover-border: transparent,
    $hover-color: $primary,
    $active-background: transparent,
    $active-border: transparent,
    $active-color: $primary,
    $disabled-background: transparent,
    $disabled-border: transparent
  );
}
</style>

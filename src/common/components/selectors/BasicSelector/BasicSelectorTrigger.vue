<template>
  <ButtonBase
    :class="[
      'selector-button',
      'ps-2',
      'pe-2',
      state === 'focused' ? 'selector-button-focused' : '',
    ]"
    :size="size"
    :color="'white'"
    :disabled="state === 'disabled'"
  >
    <section class="w-100 h-100 d-flex align-items-center">
      <span class="lh-sm w-0 flex-grow-1">{{ content }}</span>
      <section :class="['triangle-icon-' + size, 'd-flex', 'align-items-center']">
        <TriangleIcon :class="state === 'focused' ? 'rotate-180' : ''" size="100"></TriangleIcon>
      </section>
    </section>
  </ButtonBase>
</template>

<script setup lang="ts">
import ButtonBase from '@common/components/buttons/ButtonBase/ButtonBase.vue';
import TriangleIcon from '@common/components/icons/TriangleIcon/TriangleIcon.vue';

withDefaults(
  defineProps<{
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    state?: 'unfocused' | 'focused' | 'disabled';
    content?: string;
  }>(),
  {
    state: 'unfocused',
    content: '-',
  }
);
</script>

<style scoped lang="scss">
$component-prefix: 'basic-selector-trigger';

@each $key, $value in $size-ratios {
  .triangle-icon-#{$key} {
    width: #{0.75 * $value}rem;
    height: #{0.75 * $value}rem;
  }
}

.rotate-180 {
  transform: rotate(180deg);
}

.selector-button {
  width: 100%;
  --#{$prefix}btn-disabled-bg: #{$gray-100};
  --#{$prefix}btn-disabled-color: #{$gray};
}

.selector-button-focused {
  --#{$prefix}btn-border-color-top: #{$primary};
  --#{$prefix}btn-border-color-right: #{$primary};
  --#{$prefix}btn-border-color-bottom: #{$primary};
  --#{$prefix}btn-border-color-left: #{$primary};

  --#{$prefix}btn-hover-border-color-top: #{$primary};
  --#{$prefix}btn-hover-border-color-right: #{$primary};
  --#{$prefix}btn-hover-border-color-bottom: #{$primary};
  --#{$prefix}btn-hover-border-color-left: #{$primary};
}
</style>

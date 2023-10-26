<script setup lang="ts">
import ButtonBase from '@common/components/buttons/ButtonBase/ButtonBase.vue';

const props = withDefaults(
  defineProps<{
    content?: string;
    color?: string;
    size?: string;
  }>(),
  {
    content: '',
    color: 'primary',
    size: '',
  }
);

const isContentTooShort = props.content.length <= 3;
let btnSizeClassPostfix = '';
if (isContentTooShort) {
  btnSizeClassPostfix += '-more-x-padding';
}
</script>

<template>
  <ButtonBase :color="color" :size="size + btnSizeClassPostfix">
    {{ content }}
  </ButtonBase>
</template>

<style scoped lang="scss">
@import '../styles/main';
</style>

<template>
  <section class="search-box">
    <MagnifierIcon :color="'hint'" :hover="'off'" class="mx-1"></MagnifierIcon>
    <input ref="inputRef" type="text" class="form-control" :placeholder="placeholder" />
    <CircleXIcon :color="'hint'" size="xs" @click="clearInput()"></CircleXIcon>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import CircleXIcon from '@common/components/icons/CircleXIcon/CircleXIcon.vue';
import MagnifierIcon from '@common/components/icons/MagnifierIcon/MagnifierIcon.vue';

withDefaults(
  defineProps<{
    placeholder?: string;
  }>(),
  {
    placeholder: '검색어를 입력하세요',
  }
);

const emit = defineEmits<{
  (e: 'onInit', value: string): void;
  (e: 'onChange', value: string): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);

function clearInput() {
  if (inputRef.value !== null) {
    inputRef.value.value = '';
    emit('onChange', inputRef.value?.value || '');
  }
}

onMounted(() => {
  if (inputRef.value === null) return;

  emit('onInit', inputRef.value.value);
  if (inputRef.value !== null) {
    inputRef.value.oninput = () => {
      emit('onChange', inputRef.value?.value || '');
    };

    inputRef.value.onchange = () => {
      emit('onChange', inputRef.value?.value || '');
    };
  }
});

defineExpose({
  clear() {
    clearInput();
  },
});
</script>

<style scoped lang="scss">
.search-box {
  padding-left: map-get($spacers, 2);
  padding-right: map-get($spacers, 2);

  border: $border-width solid $border-color;
  @include border-radius();

  display: flex;
  flex-direction: row;
  align-items: center;

  &:focus-within {
    border: $border-width solid $primary;
    outline: none;
  }
  background-color: $gray-100;

  input {
    width: 0;
    flex-grow: 1;

    padding-left: map-get($spacers, 1);
    padding-right: map-get($spacers, 1);

    padding-top: map-get($spacers, 2);
    padding-bottom: map-get($spacers, 2);

    line-height: 1;

    border: none;
    background-color: $gray-100;
    &:focus {
      border: none;
      outline: none;
    }
  }
}
</style>

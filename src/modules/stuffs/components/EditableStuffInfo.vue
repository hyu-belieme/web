<script setup lang="ts">
import { onBeforeMount, onMounted, ref, watch } from 'vue';

import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import type StuffInfoOnly from '@common/models/StuffInfoOnly';

import StuffInfoFrame from '@^stuffs/components/stuff-detail-frames/StuffInfoFrame.vue';

const props = defineProps<{
  originalStuff: StuffInfoOnly | undefined;
}>();

const emits = defineEmits<{
  (e: 'nameChanged', newName: string): void;
  (e: 'thumbnailChanged', newThumbnail: string): void;
  (e: 'descChanged', newDesc: string): void;
  (e: 'commitChange'): void;
  (e: 'closeEditMode'): void;
}>();

const nameInput = ref<string>('');
const thumbnailInput = ref<string>('');
const descInput = ref<string>('');

onBeforeMount(() => {
  watch(nameInput, () => emits('nameChanged', nameInput.value));
  watch(thumbnailInput, () => emits('thumbnailChanged', thumbnailInput.value));
  watch(descInput, () => emits('descChanged', descInput.value));
});

onMounted(() => {
  nameInput.value = props.originalStuff?.name || '';
  thumbnailInput.value = props.originalStuff?.thumbnail || '';
  descInput.value = props.originalStuff !== undefined ? props.originalStuff?.desc : '';
});
</script>

<template>
  <StuffInfoFrame>
    <template v-slot:thumbnail>
      <section class="w-100 h-100 position-relative">
        <input
          v-model="thumbnailInput"
          type="text"
          class="thumbnail-input position-absolute top-50 start-50 translate-middle lh-1"
          aria-label="thumbnail"
        />
      </section>
    </template>
    <template v-slot:label>
      <section class="d-flex flex-row align-items-center gap-2">
        <section class="w-0 flex-grow-1 fs-base fw-semibold">
          <input
            v-model="nameInput"
            type="text"
            class="label-input"
            placeholder="물품 이름을 입력해주세요."
            aria-label="name"
          />
        </section>
        <section class="buttons">
          <BasicButton
            v-bind="{
              size: 'sm',
              content: '저장',
            }"
            @click="() => emits('commitChange')"
          ></BasicButton>
          <BasicButton
            v-bind="{
              size: 'sm',
              color: 'light',
              content: '뒤로',
            }"
            @click="() => emits('closeEditMode')"
          ></BasicButton>
        </section>
      </section>
    </template>
    <template v-slot:desc>
      <textarea
        v-model="descInput"
        class="desc-input"
        placeholder="물품 설명을 입력해주세요."
        id="floatingTextarea"
      ></textarea>
    </template>
  </StuffInfoFrame>
</template>

<style lang="scss" scoped>
.thumbnail-input {
  width: 100%;
  height: 100%;

  border: $border-width solid $border-color;
  @include border-radius();

  &:focus {
    border: $border-width solid $primary;
    outline: none;
  }
  background-color: $white;
  font-size: inherit;
  font-weight: inherit;

  text-align: center;
}

.label-input {
  width: 100%;

  border: $border-width solid $border-color;
  @include border-radius();

  padding-top: map-get($spacers, 'sm');
  padding-bottom: map-get($spacers, 'sm');

  padding-left: 2 * map-get($spacers, 'sm');
  padding-right: 2 * map-get($spacers, 'sm');
  font-size: inherit;
  font-weight: inherit;

  &:focus {
    border: $border-width solid $primary;
    outline: none;
  }

  background-color: $white;
}

.desc-input {
  width: 100%;
  height: 100%;

  border: $border-width solid $border-color;
  @include border-radius();

  padding: 2 * map-get($spacers, 'sm');
  font-size: $font-size-xs;
  font-weight: $font-weight-light;

  &:focus {
    border: $border-width solid $primary;
    outline: none;
  }

  background-color: $white;
}

.buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: map-get($map: $spacers, $key: 2);

  button {
    min-width: 3rem;
  }
}
</style>

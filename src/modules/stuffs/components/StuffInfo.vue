<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { toRef } from 'vue';

import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import type StuffInfoOnly from '@common/models/StuffInfoOnly';
import useUserModeStore from '@common/stores/user-mode-store';

import StuffInfoFrame from '@^stuffs/components/stuff-detail-frames/StuffInfoFrame.vue';

const props = defineProps<{
  stuff: StuffInfoOnly | undefined;
}>();

const emits = defineEmits<{
  (e: 'toEditMode'): void;
  (e: 'toRegisterMode'): void;
}>();

const stuff = toRef(props, 'stuff');

const userModeStore = useUserModeStore();
const { userMode } = storeToRefs(userModeStore);
</script>

<template>
  <StuffInfoFrame>
    <template v-slot:thumbnail>
      <section class="w-100 h-100 position-relative">
        <span class="position-absolute top-50 start-50 translate-middle lh-1">
          {{ stuff?.thumbnail }}
        </span>
      </section>
    </template>
    <template v-slot:label>
      <section class="d-flex flex-row align-items-center gap-2">
        <section class="w-0 flex-grow-1 fs-xl fw-semibold">
          <span>{{ stuff?.name }}</span>
        </section>
        <section v-if="userMode === 'STAFF'" class="buttons">
          <BasicButton
            v-bind="{
              size: 'sm',
              content: '수정',
            }"
            @click="emits('toEditMode')"
          ></BasicButton>
          <BasicButton
            v-bind="{
              size: 'sm',
              content: '추가',
            }"
            @click="emits('toRegisterMode')"
          ></BasicButton>
        </section>
      </section>
    </template>
    <template v-slot:desc>
      <div class="desc-frame">
        <span>{{ stuff?.desc }}</span>
      </div>
    </template>
  </StuffInfoFrame>
</template>

<style lang="scss" scoped>
.buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: map-get($map: $spacers, $key: 2);

  button {
    min-width: 3rem;
  }
}

.desc-frame {
  height: 100%;
  width: 100%;

  padding-top: map-get($spacers, 1);
  padding-bottom: map-get($spacers, 1);
  padding-left: map-get($spacers, 2);
  padding-right: map-get($spacers, 2);

  background-color: $white;
  border: $border-width solid $border-color;
  @include border-radius();

  white-space: pre-wrap;

  overflow: scroll;
}
</style>

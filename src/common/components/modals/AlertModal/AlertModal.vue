<script setup lang="ts">
import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import CloseButton from '@common/components/buttons/CloseButton/CloseButton.vue';
import BasicModal from '@common/components/modals/BasicModal/BasicModal.vue';

withDefaults(
  defineProps<{
    modalKey: string;
    index: number;
    size?: string;
    content?: string;
    hasCloseButton?: boolean;
  }>(),
  {
    size: '',
    content: '',
    hasCloseButton: false,
  }
);
</script>

<template>
  <BasicModal v-bind:index="index" v-bind:modal-key="modalKey" v-bind:size="size">
    <template v-slot:header>
      <section class="d-flex flex-direction-row align-items-stretch justify-content-between w-100">
        <span class="modal-title fs-lg fw-semibold">경고</span>
        <CloseButton v-if="hasCloseButton" @click="$emit('close')" aria-label="Close"></CloseButton>
      </section>
    </template>
    <template v-slot:body>
      <p class="no-margin-p fw-light">{{ content }}</p>
    </template>
    <template v-slot:footer>
      <div class="d-flex flex-gap-2">
        <BasicButton color="light" content="뒤로가기" @click="$emit('close')"> </BasicButton>
      </div>
    </template>
  </BasicModal>
</template>

<style scoped lang="scss">
.no-margin-p {
  margin: 0;
}
</style>

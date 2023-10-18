<script setup lang="ts">
import CloseButton from '@common/components/buttons/CloseButton/CloseButton.vue';
import BasicModal from '@common/components/modals/BasicModal/BasicModal.vue';

withDefaults(
  defineProps<{
    modalKey: string;
    index: number;
    content?: string;
    hasCloseButton?: boolean;
  }>(),
  {
    content: '',
    hasCloseButton: true,
  }
);
</script>

<template>
  <BasicModal v-bind:index="index" v-bind:modal-key="modalKey" v-bind:no-footer="true">
    <template v-slot:header>
      <h5 class="modal-title">오류</h5>
      <CloseButton v-if="hasCloseButton" @click="$emit('close')" aria-label="Close"></CloseButton>
    </template>
    <template v-slot:body>
      <p class="no-margin-p">{{ content }}</p>
    </template>
  </BasicModal>
</template>

<style scoped lang="scss">
.no-margin-p {
  margin: 0;
}
</style>

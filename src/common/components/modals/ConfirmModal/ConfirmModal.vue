<script setup lang="ts">
import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import CloseButton from '@common/components/buttons/CloseButton/CloseButton.vue';
import BasicModal from '@common/components/modals/BasicModal/BasicModal.vue';

withDefaults(
  defineProps<{
    modalKey: string;
    index: number;
    size?: string;
    title?: string;
    content?: string;
    resolveLabel?: string;
    rejectLabel?: string;
    hasCloseButton?: boolean;
  }>(),
  {
    size: '',
    title: '',
    content: '',
    resolveLabel: '',
    rejectLabel: '',
    hasCloseButton: false,
  }
);
</script>

<template>
  <BasicModal v-bind:index="index" v-bind:modalKey="modalKey" v-bind:size="size">
    <template v-slot:header>
      <span class="modal-title fs-lg fw-semibold">{{ title }}</span>
      <CloseButton v-if="hasCloseButton" @click="$emit('close')" aria-label="Close"></CloseButton>
    </template>
    <template v-slot:body>
      <p class="no-margin-p fw-light">{{ content }}</p>
    </template>
    <template v-if="rejectLabel !== '' || resolveLabel !== ''" v-slot:footer>
      <div class="d-flex flex-gap-2">
        <BasicButton
          v-if="resolveLabel !== ''"
          color="primary"
          :content="resolveLabel"
          @click="$emit('resolve')"
        >
        </BasicButton>
        <BasicButton
          v-if="rejectLabel !== ''"
          color="light"
          :content="rejectLabel"
          @click="$emit('reject')"
        >
          {{ rejectLabel }}
        </BasicButton>
      </div>
    </template>
  </BasicModal>
</template>

<style scoped lang="scss">
.no-margin-p {
  margin: 0;
}
</style>

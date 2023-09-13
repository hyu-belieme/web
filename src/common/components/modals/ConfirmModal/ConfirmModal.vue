<script setup lang="ts">
import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import CloseButton from '@common/components/buttons/CloseButton/CloseButton.vue';
import BasicModal from '@common/components/modals/BasicModal/BasicModal.vue';

withDefaults(
  defineProps<{
    title?: string;
    content?: string;
    resolveLabel?: string;
    rejectLabel?: string;
    hasCloseButton?: boolean;
    index: number;
  }>(),
  {
    title: '',
    content: '',
    resolveLabel: '',
    rejectLabel: '',
    hasCloseButton: false,
  }
);
</script>

<template>
  <BasicModal v-bind:index="index">
    <template v-slot:header>
      <h5 class="modal-title">{{ title }}</h5>
      <CloseButton v-if="hasCloseButton" @click="$emit('close')" aria-label="Close"></CloseButton>
    </template>
    <template v-slot:body>
      <p class="no-margin-p">{{ content }}</p>
    </template>
    <template v-if="rejectLabel !== '' || resolveLabel !== ''" v-slot:footer>
      <BasicButton
        v-if="rejectLabel !== ''"
        color="gray"
        :content="rejectLabel"
        @click="$emit('reject')"
      >
        {{ rejectLabel }}
      </BasicButton>
      <BasicButton
        v-if="resolveLabel !== ''"
        color="primary"
        :content="resolveLabel"
        @click="$emit('resolve')"
      >
      </BasicButton>
    </template>
  </BasicModal>
</template>

<style scoped lang="scss">
.no-margin-p {
  margin: 0;
}
</style>

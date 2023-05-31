<script setup lang="ts">
import type { List } from 'immutable';
import { storeToRefs } from 'pinia';

import type Modal from '@common/models/Modal';
import useModalStore from '@common/stores/modalStore';

const modalStore = useModalStore();
const { modals } = storeToRefs(modalStore);

function closeModal(key: string) {
  modalStore.removeModal(key);
}

function onResolve(value: any, key: string, resolve?: (value: any, key: string) => void) {
  if (resolve !== undefined) resolve(value, key);
}

function onReject(reason: any, key: string, reject?: (reason: any, key: string) => void) {
  if (reject !== undefined) reject(reason, key);
}
</script>

<template>
  <component
    v-for="modal of (modals as List<Modal>)"
    :key="modal.key"
    :is="modal.component"
    v-bind="modal.props"
    @resolve="(value: any) => onResolve(value, modal.key, modal.resolve)"
    @reject="(reason: any) => onReject(reason, modal.key, modal.reject)"
    @close="() => closeModal(modal.key)"
  >
  </component>
</template>

<style scoped></style>

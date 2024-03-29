<script setup lang="ts">
import type { List } from 'immutable';
import { storeToRefs } from 'pinia';

import useModalStore from '@common/components/modals/stores/modal-store';
import type { ModalWithKey } from '@common/components/modals/types/Modal';

const modalStore = useModalStore();
const { modals } = storeToRefs(modalStore);

function closeModal() {
  modalStore.removeModal();
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
    v-for="(modal, index) of (modals as List<ModalWithKey>)"
    :key="modal.key"
    :is="modal.component"
    v-bind="{
      ...modal.props,
      modalKey: modal.key,
      index: index,
    }"
    @resolve="(value: any) => onResolve(value, modal.key, modal.resolve)"
    @reject="(reason: any) => onReject(reason, modal.key, modal.reject)"
    @close="() => closeModal()"
  >
  </component>
  <div
    v-if="modals.size != 0"
    class="modal-backdrop show"
    :key="modals.size"
    :style="{
      '--bs-backdrop-zindex': `calc(${(modals.size - 1) * 2} + var(--bs-base-backdrop-zindex))`,
    }"
  ></div>
</template>

<style scoped lang="scss">
@import '@common/components/modals/styles/main.scss';
</style>

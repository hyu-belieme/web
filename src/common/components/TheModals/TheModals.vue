<script setup lang="ts">
import { useModalStore, type Modal } from "@common/stores/modalStore.js";
import type { List } from "immutable";
import { storeToRefs } from "pinia";

const modalStore = useModalStore();
const { modals } = storeToRefs(modalStore);

const closeModal = (key: string) => {
  modalStore.removeModal(key);
};

const onResolve = (value: any, key: string, resolve: (value: any, key: string) => void) => {
  resolve(value, key);
};

const onReject = (reason: any, key: string, reject: (reason: any, key: string) => void) => {
  reject(reason, key);
};
</script>

<template>
  <component
    v-for="modal in (modals as List<Modal>)"
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

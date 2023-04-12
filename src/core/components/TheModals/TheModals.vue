<script setup lang="ts">
import { useModalStore, type Modal } from "@common/stores/modalStore.js";
import { storeToRefs } from "pinia";

const modalStore = useModalStore();
const { modals } = storeToRefs(modalStore);

const closeModal = (key: string) => {
  modalStore.removeModal(key);
};
const onResolve = (value: any, key: string, resolve: (value: any) => void) => {
  resolve(value);
  closeModal(key);
};

const onReject = (reason: any, key: string, reject: (reason: any) => void) => {
  reject(reason);
  closeModal(key);
};
</script>

<template>
  <component
    v-for="modal in modals"
    :key="(modal as Modal).key"
    :is="(modal as Modal).component"
    v-bind="(modal as Modal).props"
    @resolve="(value: any) => onResolve(value, (modal as Modal).key, (modal as Modal).resolve)"
    @reject="(reason: any) => onReject(reason, (modal as Modal).key, (modal as Modal).reject)"
    @close="() => closeModal((modal as Modal).key)"
  >
  </component>
</template>

<style scoped></style>

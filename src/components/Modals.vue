<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import { useModalStore } from "@/stores/modalStore";
import { storeToRefs } from "pinia";
import { ref, watch, onBeforeUpdate, onBeforeMount } from "vue";

const modalRefs = ref();

const modalStore = useModalStore();
const { modals, toShow, toShowCount, toHide, toHideCount } = storeToRefs(modalStore);

watch(toShowCount, (newVal, oldVal) => {
  let idx = modals.value.findIndex((e) => e.id == toShow.value);
  if (idx == undefined || idx < 0 || newVal == 0) return;
  modalRefs.value[idx].show();
  modalStore.commitShow();
});

watch(toHideCount, (newVal, oldVal) => {
  let idx = modals.value.findIndex((e) => e.id == toHide.value);
  if (idx == undefined || idx < 0 || newVal == 0) return;
  modalRefs.value[idx].hide();
  modalStore.commitHide();
});

onBeforeUpdate(() => {
  modalRefs.value = [];
});

onBeforeMount(() => {
  modalRefs.value = [];
});
</script>

<template>
  <Modal
    v-for="(modal, idx) in modals"
    :key="modal.id"
    :ref="
      (el) => {
        modalRefs[idx] = el;
      }
    "
    :title="modal.title"
    :content="modal.content"
    :resolve-btn="modal.resolveBtn"
    :reject-btn="modal.rejectBtn"
  >
    <template v-if="modal.templateHeader" v-slot:header>
      <div v-html="modal.templateHeader"></div>
    </template>
    <template v-if="modal.templateBody" v-slot:body>
      <div v-html="modal.templateBody"></div>
    </template>
    <template v-if="modal.templateFooter" v-slot:footer>
      <div v-html="modal.templateFooter"></div>
    </template>
  </Modal>
</template>

<style scoped></style>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import { ref, onMounted, onBeforeUpdate, onUpdated, onBeforeMount } from "vue";

interface _Modal {
  id: string;
  title?: string;
  content?: string;
  posBtnText?: string;
  negBtnText?: string;
  templateHeader?: string;
  templateBody?: string;
  templateFooter?: string;
}

const modals = ref<_Modal[]>([]);
const modalRefs = ref();

const showModal = (id: string) => {
  let idx = modals.value.findIndex((e) => e.id == id);
  if (idx == undefined) return;

  modalRefs.value[idx].show();
};

onBeforeUpdate(() => {
  modalRefs.value = [];
});

onBeforeMount(() => {
  modalRefs.value = [];

  modals.value.push({
    id: "A",
    title: "Modal A",
    content: "이것은 Modal A",
    negBtnText: "취소"
  });
  modals.value.push({
    id: "B",
    title: "Modal B",
    content: "이것은 Modal B",
    negBtnText: "취소",
    templateHeader: `<i class='modal-title'>Modal B</i>`,
    templateBody: `<i>{{ content }}</i>`,
    templateFooter: `
      <button
        v-if="negBtnText != undefined"
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
      >
        {{ negBtnText }}
      </button>
    `
  });
  modals.value.push({
    id: "C",
    title: "Modal C",
    content: "이것은 Modal C",
    negBtnText: "취소"
  });
});

onMounted(() => {
  showModal("B");
  showModal("A");
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
    :pos-btn-text="modal.posBtnText"
    :neg-btn-text="modal.negBtnText"
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

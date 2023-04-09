<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Modal } from "bootstrap";
import type { ButtonInModal } from "@/stores/modalStore";

let modalEle = ref();
let thisModalObj: Modal | null = null;

defineProps<{
  title?: string;
  content?: string;
  posBtnText?: string;
  negBtnText?: string;
  resolveBtn?: ButtonInModal;
  rejectBtn?: ButtonInModal;
}>();

onMounted(() => {
  thisModalObj = new Modal(modalEle.value);
});

function showModal() {
  thisModalObj!.show();
}
function hideModal() {
  thisModalObj!.hide();
}
defineExpose({ show: showModal, hide: hideModal });
</script>

<template>
  <div ref="modalEle" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" @click="" aria-label="Close"></button>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">
            <p>{{ content }}</p>
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button
              v-if="rejectBtn != undefined"
              type="button"
              class="btn btn-secondary"
              @click="rejectBtn?.event"
            >
              {{ rejectBtn.label }}
            </button>
            <button
              v-if="resolveBtn != undefined"
              type="button"
              class="btn btn-primary"
              @click="resolveBtn?.event"
            >
              {{ resolveBtn.label }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { Modal } from 'bootstrap';
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineProps<{
  content?: string;
}>();

const modalEle = ref();
let thisModalObj: Modal | undefined;

function showModal() {
  thisModalObj!.show();
}
function hideModal() {
  thisModalObj!.hide();
}

onMounted(() => {
  thisModalObj = new Modal(modalEle.value);
  showModal();
});

onBeforeUnmount(() => {
  hideModal();
});
</script>

<template>
  <div ref="modalEle" class="modal" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header">
            <p class="modal-title">{{ content }}</p>
            <button
              type="button"
              class="btn-close"
              @click="$emit('close')"
              aria-label="Close"
            ></button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { Modal } from 'bootstrap';
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineProps<{
  title?: string;
  content?: string;
  resolveLabel?: string;
  rejectLabel?: string;
}>();

const modalEle = ref();

let thisModalObj: Modal;

onMounted(() => {
  thisModalObj = new Modal(modalEle.value);
  thisModalObj.show();
});

onBeforeUnmount(() => {
  thisModalObj.hide();
});
</script>

<template>
  <div ref="modalEle" class="modal" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
              type="button"
              class="btn-close"
              @click="$emit('close')"
              aria-label="Close"
            ></button>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">
            <p>{{ content }}</p>
          </slot>
        </div>
        <div v-if="rejectLabel !== undefined || resolveLabel !== undefined" class="modal-footer">
          <slot name="footer">
            <button
              v-if="rejectLabel !== undefined"
              type="button"
              class="btn btn-secondary"
              @click="$emit('reject')"
            >
              {{ rejectLabel }}
            </button>
            <button
              v-if="resolveLabel !== undefined"
              type="button"
              class="btn btn-primary"
              @click="$emit('resolve')"
            >
              {{ resolveLabel }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

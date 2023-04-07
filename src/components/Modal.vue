<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Modal } from "bootstrap";

let modalEle = ref();
let thisModalObj: Modal | null = null;

defineProps<{
  title?: string;
  content?: string;
  posBtnText?: string;
  negBtnText?: string;
}>();

onMounted(() => {
  thisModalObj = new Modal(modalEle.value);
});
function showModal() {
  thisModalObj!.show();
}
defineExpose({ show: showModal });
</script>

<template>
  <div ref="modalEle" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
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
              v-if="negBtnText != undefined"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {{ negBtnText }}
            </button>
            <button v-if="posBtnText != undefined" type="button" class="btn btn-primary">
              {{ posBtnText }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

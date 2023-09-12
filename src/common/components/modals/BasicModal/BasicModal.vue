<script setup lang="ts">
import { Modal } from 'bootstrap';
import { onBeforeUnmount, onMounted, ref } from 'vue';

withDefaults(
  defineProps<{
    noHeader?: boolean;
    noBody?: boolean;
    noFooter?: boolean;
  }>(),
  {
    noHeader: false,
    noBody: false,
    noFooter: false,
  }
);

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
  <div ref="modalEle" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div v-if="!noHeader" class="modal-header">
          <slot name="header"> </slot>
        </div>
        <div v-if="!noBody" class="modal-body">
          <slot name="body"> </slot>
        </div>
        <div v-if="!noFooter" class="modal-footer">
          <slot name="footer"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@common/components/modals/styles/main.scss';
</style>

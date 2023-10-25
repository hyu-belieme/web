<script setup lang="ts">
withDefaults(
  defineProps<{
    modalKey: string;
    index: number;
    size?: string;
    noHeader?: boolean;
    noBody?: boolean;
    noFooter?: boolean;
  }>(),
  {
    size: '',
    noHeader: false,
    noBody: false,
    noFooter: false,
  }
);
</script>

<template>
  <div
    ref="modalEle"
    :class="['modal', 'show', size !== '' ? `modal-${size}` : '']"
    tabindex="-1"
    :style="{
      '--bs-modal-zindex': `calc(${index * 2} + var(--bs-base-modal-zindex))`,
      display: 'block',
    }"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content" :modal-key="modalKey">
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

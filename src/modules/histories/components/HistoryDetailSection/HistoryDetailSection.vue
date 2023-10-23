<script setup lang="ts">
import HistoryDetailContent from '@^histories/components/HistoryDetailContent/HistoryDetailContent.vue';
import ProcedureDesc from '@^histories/components/ProcedureDesc/ProcedureDesc.vue';

defineProps<{
  inheritStatus: 'Loading' | 'Success' | 'Error';
}>();
</script>

<template>
  <section class="history-detail">
    <HistoryDetailContent :inheritStatus="inheritStatus"></HistoryDetailContent>
    <ProcedureDesc></ProcedureDesc>
  </section>
</template>

<style lang="scss" scoped>
.history-detail {
  width: 0;
  height: 100%;
  flex-grow: 1;

  display: flex;
  flex-direction: column;

  .history-info {
    flex-grow: 0;
  }

  .procedure-desc {
    flex-grow: 1;
  }
}
</style>

<script setup lang="ts">
import HistoryDetailContent from "@^histories/components/HistoryDetailContent/HistoryDetailContent.vue";
import ProcedureDesc from "@^histories/components/ProcedureDesc/ProcedureDesc.vue";
</script>

<template>
  <section class="history-detail">
    <HistoryDetailContent></HistoryDetailContent>
    <ProcedureDesc></ProcedureDesc>
  </section>
</template>

<style lang="scss" scoped>
.history-detail {
  display: flex;
  flex-direction: column;

  gap: map-get($map: $spacers, $key: 4);

  .history-info {
    background-color: $white;
    padding: map-get($map: $spacers, $key: 4);
    flex-grow: 0;
  }

  .procedure-desc {
    padding: map-get($map: $spacers, $key: 4);
    flex-grow: 1;
  }
}
</style>

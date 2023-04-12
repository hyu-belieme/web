<script setup lang="ts">
import HistoryInfo from "@components/HistoryInfo.vue";
import ProcedureDesc from "@/components/ProcedureDesc.vue";
</script>

<template>
  <section class="history-detail">
    <HistoryInfo></HistoryInfo>
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

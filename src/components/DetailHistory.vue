<script setup>
import HistoryInfo from "@/components/HistoryInfo.vue";
</script>

<template>
  <section class="history-detail">
    <HistoryInfo></HistoryInfo>
    <section class="procedure-desc"></section>
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

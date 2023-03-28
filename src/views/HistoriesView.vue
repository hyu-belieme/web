<script setup>
import HistoryList from "@/components/HistoryList.vue";
</script>

<template>
  <section class="history-list-page">
    <HistoryList></HistoryList>
  </section>
</template>

<style lang="scss" scoped>
$list-tab-ratio: 16;
$detail-tab-ratio: 25;

.history-list-page {
  height: 100%;

  display: flex;
  flex-direction: row;
  gap: map-get($map: $spacers, $key: 4);

  padding-bottom: map-get($map: $spacers, $key: 4);

  .history-list {
    height: 100%;
    flex-basis: 0;
    flex-grow: $list-tab-ratio;
    background-color: $white;
  }

  .history-detail {
    height: 100%;
    flex-basis: 0;
    flex-grow: $detail-tab-ratio;
    background-color: $white;
  }
}
</style>

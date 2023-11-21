<script setup lang="ts">
import { storeToRefs } from 'pinia';

import HistoryDetailTab from '@^histories/components/HistoryDetailTab.vue';
import HistoryListTab from '@^histories/components/HistoryListTab.vue';
import useHistorySelectedStore from '@^histories/stores/history-selected-store';

const historySelectedStore = useHistorySelectedStore();
const { selectedId } = storeToRefs(historySelectedStore);
</script>

<template>
  <section class="tabs-wrapper">
    <section class="list-section">
      <HistoryListTab></HistoryListTab>
    </section>
    <section class="detail-section">
      <HistoryDetailTab :key="selectedId"></HistoryDetailTab>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.tabs-wrapper {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  gap: map-get($map: $spacers, $key: 3);

  .list-section {
    width: 24rem;
    height: 100%;
  }

  .detail-section {
    width: 0;
    height: 100%;

    flex-grow: 1;
  }
}
</style>

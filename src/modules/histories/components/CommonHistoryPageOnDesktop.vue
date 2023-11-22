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
$list-height: calc(100vh - $header-height-desktop);

.tabs-wrapper {
  width: 100%;
  height: fit-content;
  min-height: $list-height;

  display: flex;
  flex-direction: row;
  gap: map-get($map: $spacers, $key: 3);

  .list-section {
    width: 24rem;
    height: $list-height;

    position: sticky;
    top: 0;
  }

  .detail-section {
    width: 0;

    padding-top: map-get($map: $spacers, $key: 2);
    padding-bottom: map-get($map: $spacers, $key: 3);

    flex-grow: 1;
  }
}
</style>

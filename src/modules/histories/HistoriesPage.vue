<script setup lang="ts">
import HistoryDetail from "@^histories/components/HistoryDetailSection/HistoryDetailSection.vue";
import HistoryList from "@^histories/components/HistoryList/HistoryList.vue";
import HistoryPageOnEmpty from "@^histories/components/HistoryPageOnEmpty/HistoryPageOnEmpty.vue";
import { useHistoryStore } from "@^histories/stores/historyStore";

import { loading } from "@common/types/Loading";

import { storeToRefs } from "pinia";

const historyStore = useHistoryStore();
const { histories } = storeToRefs(historyStore);
</script>

<template>
  <section class="history-list-page">
    <template v-if="histories === loading || histories === undefined || histories.size !== 0">
      <HistoryList></HistoryList>
      <HistoryDetail></HistoryDetail>
    </template>
    <template v-else>
      <HistoryPageOnEmpty></HistoryPageOnEmpty>
    </template>
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
    max-width: calc(100% * $list-tab-ratio / ($list-tab-ratio + $detail-tab-ratio));
    height: 100%;
    flex-basis: 0;
    flex-grow: $list-tab-ratio;
  }

  .history-detail {
    max-width: calc(100% * $detail-tab-ratio / ($list-tab-ratio + $detail-tab-ratio));
    height: 100%;
    flex-basis: 0;
    flex-grow: $detail-tab-ratio;
  }
}
</style>

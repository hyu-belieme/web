<script setup lang="ts">
import HistoryDetail from "@^histories/components/HistoryDetailSection/HistoryDetailSection.vue";
import HistoryList from "@^histories/components/HistoryList/HistoryList.vue";
import HistoryPageOnEmpty from "@^histories/components/HistoryPageOnEmpty/HistoryPageOnEmpty.vue";
import { getHistoryListQuery } from "@^histories/queries/HistoryQueries";

const { data, isLoading, isError, isSuccess } = getHistoryListQuery();
</script>

<template>
  <section class="history-list-page">
    <template v-if="isLoading || isError || (isSuccess && data?.size !== 0)">
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

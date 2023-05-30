<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";

import HistoryDetail from "@^histories/components/HistoryDetailSection/HistoryDetailSection.vue";
import HistoryList from "@^histories/components/HistoryList/HistoryList.vue";
import HistoryPageOnEmpty from "@^histories/components/HistoryPageOnEmpty/HistoryPageOnEmpty.vue";
import { getHistoryListQuery } from "@^histories/components/utils/utils";
import { useHistorySelectedStore } from "@^histories/stores/historySelectedStore";

const historySelectedStore = useHistorySelectedStore();
const { selectedId } = storeToRefs(historySelectedStore);

const { data, isLoading, isError, isSuccess, isFetching } = getHistoryListQuery();
const dataLoadStatus = computed(() => {
  if (isFetching.value || isLoading.value) return "Loading";
  if (isSuccess.value) return "Success";
  return "Error";
});
</script>

<template>
  <template v-if="isLoading || isError || (isSuccess && data?.size !== 0)">
    <HistoryList></HistoryList>
    <HistoryDetail :inheritStatus="dataLoadStatus" :key="selectedId"></HistoryDetail>
  </template>
  <template v-else>
    <HistoryPageOnEmpty></HistoryPageOnEmpty>
  </template>
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

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import HistoryDetail from '@^histories/components/HistoryDetailSection/HistoryDetailSection.vue';
import HistoryList from '@^histories/components/HistoryList/HistoryList.vue';
import { getHistoryListQuery } from '@^histories/components/utils/utils';
import useHistorySelectedStore from '@^histories/stores/historySelectedStore';

const historySelectedStore = useHistorySelectedStore();
const { selectedId } = storeToRefs(historySelectedStore);

const { isLoading, isSuccess, isFetching } = getHistoryListQuery();
const dataLoadStatus = computed(() => {
  if (isFetching.value || isLoading.value) return 'Loading';
  if (isSuccess.value) return 'Success';
  return 'Error';
});
</script>

<template>
  <HistoryList></HistoryList>
  <HistoryDetail :inheritStatus="dataLoadStatus" :key="selectedId"></HistoryDetail>
</template>

<style lang="scss" scoped>
$list-tab-ratio: 16;
$detail-tab-ratio: 25;
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
</style>

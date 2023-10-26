<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import HistoryDetail from '@^histories/components/HistoryDetailSection/HistoryDetailSection.vue';
import HistoryList from '@^histories/components/HistoryList/HistoryList.vue';
import { getHistoryListQuery } from '@^histories/components/utils/history-query-utils';
import useHistorySelectedStore from '@^histories/stores/history-selected-store';

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
  <section class="history-content-frame h-100 w-100">
    <HistoryList></HistoryList>
    <HistoryDetail :inheritStatus="dataLoadStatus" :key="selectedId"></HistoryDetail>
  </section>
</template>

<style lang="scss" scoped>
.history-content-frame {
  display: flex;
  flex-direction: row;
  gap: map-get($map: $spacers, $key: 3);
}
</style>

<script setup lang="ts">
import { computed } from 'vue';

import DataLoadFailView from '@common/components/DataLoadFailView/DataLoadFailView.vue';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';

import HistoryList from '@^histories/components/HistoryList.vue';
import { getHistoryListQuery } from '@^histories/components/utils/history-query-utils';
import CategorizeHistories from '@^histories/utils/history-categorizer';

const { data, isLoading, isSuccess, isFetching } = getHistoryListQuery();

const categorizedHistoriesList = computed(() => {
  if (data.value === undefined) return undefined;
  return CategorizeHistories(data.value);
});

const dataLoadStatus = computed(() => {
  if (isFetching.value || isLoading.value) return 'Loading';
  if (isSuccess.value) return 'Success';
  return 'Error';
});
</script>

<template>
  <template v-if="dataLoadStatus === 'Success' && categorizedHistoriesList !== undefined">
    <HistoryList :histories="data"></HistoryList>
  </template>
  <LoadingView v-else-if="dataLoadStatus === 'Loading'"></LoadingView>
  <DataLoadFailView v-else></DataLoadFailView>
</template>

<style lang="scss" scoped></style>

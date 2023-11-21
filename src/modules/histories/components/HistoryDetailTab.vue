<script setup lang="ts">
import { computed } from 'vue';

import DataLoadFailView from '@common/components/DataLoadFailView/DataLoadFailView.vue';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';

import HistoryDetail from '@^histories/components/HistoryDetail.vue';
import {
  getHistoryDetailQuery,
  getHistoryListQuery,
} from '@^histories/components/utils/history-query-utils';

const { isLoading: isListLoading, isSuccess: isListSuccess } = getHistoryListQuery();
const { isLoading, isSuccess, data } = getHistoryDetailQuery();

const dataLoadStatus = computed(() => {
  if (isListLoading.value) return 'Loading';
  if (isListSuccess.value) {
    if (isLoading.value) return 'Loading';
    if (isSuccess.value) return 'Success';
    return 'Error';
  }
  return 'Error';
});
</script>

<template>
  <section class="history-detail">
    <template v-if="dataLoadStatus === 'Success'">
      <HistoryDetail :data="data"></HistoryDetail>
    </template>
    <template v-else-if="dataLoadStatus === 'Loading'">
      <LoadingView></LoadingView>
    </template>
    <template v-else>
      <DataLoadFailView></DataLoadFailView>
    </template>
  </section>
</template>

<style lang="scss" scoped></style>

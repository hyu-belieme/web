<script setup lang="ts">
import { computed, toRef } from 'vue';

import DataLoadFailView from '@common/components/DataLoadFailView/DataLoadFailView.vue';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';

import HistoryDetail from '@^histories/components/HistoryDetail.vue';
import { getHistoryDetailQuery } from '@^histories/components/utils/history-query-utils';

const props = defineProps<{
  userToken: string;
  selectedId: string;
  isListSuccess: boolean;
  isListLoading: boolean;
  isListError: boolean;
}>();

const isListSuccess = toRef(props, 'isListSuccess');
const isListLoading = toRef(props, 'isListLoading');
const isListError = toRef(props, 'isListError');

const { isLoading, isSuccess, isError, isFetching, data } = getHistoryDetailQuery(
  props.userToken,
  props.selectedId
);

const dataLoadStatus = computed(() => {
  if (isListLoading.value) return 'Loading';
  if (isListError.value) return 'Error';
  if (isListSuccess.value) {
    if (isLoading.value || isFetching.value) return 'Loading';
    if (isError.value) return 'Error';
    if (isSuccess.value) return 'Success';
    return 'Error';
  }
  return 'Error';
});
</script>

<template>
  <HistoryDetail v-if="dataLoadStatus === 'Success'" :data="data"></HistoryDetail>
  <LoadingView v-else-if="dataLoadStatus === 'Loading'"></LoadingView>
  <DataLoadFailView v-else></DataLoadFailView>
</template>

<style lang="scss" scoped></style>

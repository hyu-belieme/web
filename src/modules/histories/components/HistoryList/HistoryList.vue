<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import DataLoadFailView from '@common/components/DataLoadFailView/DataLoadFailView.vue';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';

import HistoryCell from '@^histories/components/HistoryListCell/HistoryListCell.vue';
import { getHistoryListQuery } from '@^histories/components/utils/history-query-utils';
import useHistorySelectedStore from '@^histories/stores/history-selected-store';
import type { HistoryCategory } from '@^histories/types/HistoryCategory';
import CategorizeHistories from '@^histories/utils/history-categorizer';

const historySelectedStore = useHistorySelectedStore();
const { selectedId } = storeToRefs(historySelectedStore);

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

function updateSelectedId(newSelectedId: string) {
  historySelectedStore.updateSelectedId(newSelectedId);
}

function headerLabel(category: HistoryCategory) {
  switch (category) {
    case 'REQUESTED':
      return '요청된 기록';
    case 'USING':
      return '사용 중인 기록';
    case 'LOST':
      return '분실된 기록';
    case 'RETURNED':
      return '반납된 기록';
    case 'EXPIRED':
      return '취소된 기록';
    default:
      return 'ERROR';
  }
}
</script>

<template>
  <section class="history-list">
    <template v-if="dataLoadStatus === 'Success' && categorizedHistoriesList !== undefined">
      <template
        v-for="categorizedHistories of categorizedHistoriesList"
        :key="categorizedHistories.category"
      >
        <section class="cell-header">{{ headerLabel(categorizedHistories.category) }}</section>
        <HistoryCell
          v-for="history of categorizedHistories.histories"
          :key="history.id"
          v-bind="{
            history: history,
            selected: selectedId === history.id,
          }"
          @click="updateSelectedId(history.id)"
        ></HistoryCell>
        <template
          v-if="
            (categorizedHistories.category === 'RETURNED' ||
              categorizedHistories.category === 'EXPIRED') &&
            categorizedHistories.histories.size >= 5
          "
        >
          <section class="cell-hider">
            <span>더 보기</span>
            <i class="bi bi-chevron-down"></i>
          </section>
        </template>
      </template>
    </template>
    <LoadingView v-else-if="dataLoadStatus === 'Loading'"></LoadingView>
    <DataLoadFailView v-else></DataLoadFailView>
  </section>
</template>

<style lang="scss" scoped>
.history-list {
  $list-cell-height: 4rem;
  $header-cell-height: 1.75rem;

  display: flex;
  flex-direction: column;

  background-color: $white;

  overflow: scroll;

  .cell-header {
    $padding-size: map-get($spacers, 1);

    height: $header-cell-height;
    background-color: $body-bg;
    padding-left: $padding-size;
    font-size: 0.8rem;
    font-weight: 200;
    line-height: 1.75rem;
  }

  .cell-hider {
    height: $header-cell-height;
    background-color: $white;

    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: map-get($spacers, 1);

    font-size: 0.8rem;
    font-weight: 200;
    line-height: 1.75rem;
  }
}
</style>

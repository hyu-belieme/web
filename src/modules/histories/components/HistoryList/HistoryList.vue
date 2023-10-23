<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { NIL as NIL_UUID } from 'uuid';
import { computed, watch } from 'vue';

import DataLoadFailView from '@common/components/DataLoadFailView/DataLoadFailView.vue';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import HiderCheckbox from '@common/components/checkboxes/HiderCheckbox/HiderCheckbox.vue';

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

function convertIdToFirstIdIfNotExist() {
  if (data.value === undefined || data.value.isEmpty()) return NIL_UUID;

  const selected = data.value.find((value) => value.id === selectedId.value);
  if (selected === undefined) return data.value.get(0)?.id || NIL_UUID;
  return selected.id;
}

watch(
  data,
  () => {
    const convertedSelectedId = convertIdToFirstIdIfNotExist();
    if (convertedSelectedId !== selectedId.value) {
      historySelectedStore.updateSelectedId(convertedSelectedId);
    }
  },
  { immediate: true }
);
</script>

<template>
  <section class="history-list">
    <template v-if="dataLoadStatus === 'Success' && categorizedHistoriesList !== undefined">
      <section
        class="history-sublist"
        v-for="categorizedHistories of categorizedHistoriesList"
        :key="categorizedHistories.category"
      >
        <section class="cell-header">{{ headerLabel(categorizedHistories.category) }}</section>
        <section class="cell-frame">
          <HistoryCell
            v-for="history of categorizedHistories.histories"
            :key="history.id"
            v-bind="{
              history: history,
              selected: selectedId === history.id,
            }"
            @click="updateSelectedId(history.id)"
          ></HistoryCell>
          <section
            v-if="
              (categorizedHistories.category === 'RETURNED' ||
                categorizedHistories.category === 'EXPIRED') &&
              categorizedHistories.histories.size >= 5
            "
            class="cell-hider"
          >
            <span>10개 더보기</span>
            <HiderCheckbox :color="'gray'" :state="'hidden'" :multiplier="0.4"></HiderCheckbox>
          </section>
        </section>
      </section>
    </template>
    <LoadingView v-else-if="dataLoadStatus === 'Loading'"></LoadingView>
    <DataLoadFailView v-else></DataLoadFailView>
  </section>
</template>

<style lang="scss" scoped>
.history-list {
  height: 100%;
  width: 24rem;

  display: flex;
  flex-direction: column;
  gap: map-get($spacers, 2);

  overflow: scroll;

  .history-sublist {
    width: 100%;

    display: flex;
    flex-direction: column;
    .cell-header {
      color: $gray-700;
      line-height: 1;

      padding-left: map-get($spacers, 2);
      padding-top: map-get($spacers, 1);
      padding-bottom: map-get($spacers, 1);
      font-size: $font-size-xsm;
      font-weight: $font-weight-light;
    }

    .cell-frame {
      background-color: $white;
      border: $border-width solid $border-color;
      @include border-radius();

      display: flex;
      flex-direction: column;

      .cell-hider {
        font-size: $font-size-xsm;
        line-height: 1;
        color: $gray-700;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: map-get($spacers, 1);

        padding-top: map-get($spacers, 2);
        padding-bottom: map-get($spacers, 2);
      }
    }
  }
}
</style>

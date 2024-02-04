<script setup lang="ts">
import { NIL as NIL_UUID } from 'uuid';
import { toRef, watch } from 'vue';
import { useRouter } from 'vue-router';

import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import HiderCheckbox from '@common/components/checkboxes/HiderCheckbox/HiderCheckbox.vue';
import type History from '@common/models/History';

import HistoryCell from '@^histories/components/HistoryListCell.vue';
import type { HistoryCategory } from '@^histories/types/HistoryCategory';
import type { CategorizedHistorySet } from '@^histories/types/HistorySet';

const props = defineProps<{
  categorizedHistories: CategorizedHistorySet[] | undefined;
  selectedId: string;
  isReturnedFetchingNextPage: boolean;
  isExpiredFetchingNextPage: boolean;
  hasReturnedNextPage: boolean;
  hasExpiredNextPage: boolean;
}>();

const emit = defineEmits<{
  (e: 'updateSelectedId', selectedId: string): void;
  (e: 'fetchReturnedNextPage'): void;
  (e: 'fetchExpiredNextPage'): void;
}>();

const categorizedHistories = toRef(props, 'categorizedHistories');
const isReturnedFetchingNextPage = toRef(props, 'isReturnedFetchingNextPage');
const isExpiredFetchingNextPage = toRef(props, 'isExpiredFetchingNextPage');
const hasExpiredNextPage = toRef(props, 'hasExpiredNextPage');
const hasReturnedNextPage = toRef(props, 'hasReturnedNextPage');

const router = useRouter();

const selectedId = toRef(props, 'selectedId');

function moveToHistoryCell(newSelectedId: string) {
  router.push(`/histories?historyId=${newSelectedId}`);
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

function needHider(historySet: CategorizedHistorySet) {
  return (
    (historySet.category === 'RETURNED' && hasReturnedNextPage.value) ||
    (historySet.category === 'EXPIRED' && hasExpiredNextPage.value)
  );
}

function fetchNextPage(historySet: CategorizedHistorySet) {
  if (historySet.category === 'RETURNED') {
    emit('fetchReturnedNextPage');
  } else if (historySet.category === 'EXPIRED') {
    emit('fetchExpiredNextPage');
  }
}

function convertIdToFirstIdIfNotExist() {
  if (categorizedHistories.value === undefined || categorizedHistories.value.length === 0) {
    return NIL_UUID;
  }

  let selected: History | undefined = categorizedHistories.value[0]?.histories[0] || undefined;
  categorizedHistories.value.forEach((historySet) => {
    const tmpSelected = historySet.histories.find((history) => history.id === selectedId.value);
    if (tmpSelected !== undefined) selected = tmpSelected;
  });

  return selected?.id || NIL_UUID;
}

watch(
  categorizedHistories,
  () => {
    const convertedSelectedId = convertIdToFirstIdIfNotExist();
    if (convertedSelectedId !== selectedId.value) {
      emit('updateSelectedId', convertedSelectedId);
    }
  },
  { immediate: true }
);
</script>

<template>
  <section class="history-list">
    <section
      class="history-sublist"
      v-for="historySet of categorizedHistories"
      :key="historySet.category"
    >
      <section class="cell-header">{{ headerLabel(historySet.category) }}</section>
      <section class="cell-frame">
        <HistoryCell
          v-for="history of historySet.histories"
          :key="history.id"
          v-bind="{
            history: history,
            selected: selectedId === history.id,
          }"
          @click="moveToHistoryCell(history.id)"
        ></HistoryCell>
        <section
          v-if="
            (historySet.category === 'RETURNED' && isReturnedFetchingNextPage) ||
            (historySet.category === 'EXPIRED' && isExpiredFetchingNextPage)
          "
          class="loading-cell"
        >
          <LoadingView />
        </section>
        <section
          v-else-if="needHider(historySet)"
          class="cell-hider"
          @click="fetchNextPage(historySet)"
        >
          <span>10개 더보기</span>
          <section class="hider-icon-size d-flex align-items-center">
            <HiderCheckbox
              class="flex-grow-1"
              :color="'gray'"
              :state="'hidden'"
              size="auto"
            ></HiderCheckbox>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.history-list {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: map-get($spacers, 2);
  padding-bottom: map-get($spacers, 3);

  @include media-breakpoint-up('tablet-landscape') {
    padding-top: map-get($spacers, 2);
  }

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
      font-size: $font-size-xs;
      font-weight: $font-weight-light;
    }

    .cell-frame {
      background-color: $white;
      border: $border-width solid $border-color;
      @include border-radius();

      display: flex;
      flex-direction: column;

      .loading-cell {
        padding-top: map-get($spacers, 2);
        padding-bottom: map-get($spacers, 2);
      }

      .cell-hider {
        &:hover {
          background-color: $gray-100;
        }

        font-size: $font-size-xs;
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

  .hider-icon-size {
    width: 0.5rem;
  }
}
</style>

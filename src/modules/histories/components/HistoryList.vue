<script setup lang="ts">
import type { List } from 'immutable';
import { storeToRefs } from 'pinia';
import { NIL as NIL_UUID } from 'uuid';
import { computed, toRef, watch } from 'vue';
import { useRouter } from 'vue-router';

import HiderCheckbox from '@common/components/checkboxes/HiderCheckbox/HiderCheckbox.vue';
import type History from '@common/models/History';

import HistoryCell from '@^histories/components/HistoryListCell.vue';
import useHistorySelectedStore from '@^histories/stores/history-selected-store';
import type { CategorizedHistories } from '@^histories/types/CategorizedHistories';
import type { HistoryCategory } from '@^histories/types/HistoryCategory';
import CategorizeHistories from '@^histories/utils/history-categorizer';

const props = defineProps<{
  histories: List<History> | undefined;
}>();

const histories = toRef(props, 'histories');

const router = useRouter();

const historySelectedStore = useHistorySelectedStore();
const { selectedId } = storeToRefs(historySelectedStore);

const categorizedHistoriesList = computed(() => {
  if (histories.value === undefined) return undefined;
  return CategorizeHistories(histories.value);
});

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

function moveToHistoryCell(newSelectedId: string) {
  router.push(`/histories?historyId=${newSelectedId}`);
}

function needHider(categorizedHistories: CategorizedHistories) {
  return (
    (categorizedHistories.category === 'RETURNED' || categorizedHistories.category === 'EXPIRED') &&
    categorizedHistories.histories.size >= 5
  );
}

function convertIdToFirstIdIfNotExist() {
  if (histories.value === undefined || histories.value.isEmpty()) return NIL_UUID;

  const selected = histories.value.find((value) => value.id === selectedId.value);
  if (selected === undefined) return histories.value.get(0)?.id || NIL_UUID;
  return selected.id;
}

watch(
  histories,
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
          @click="moveToHistoryCell(history.id)"
        ></HistoryCell>
        <section v-if="needHider(categorizedHistories)" class="cell-hider">
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

      .cell-hider {
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

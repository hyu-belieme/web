<script setup lang="ts">
import DataLoadFailView from "@common/components/DataLoadFailView/DataLoadFailView.vue";
import LoadingView from "@common/components/LoadingView/LoadingView.vue";
import { loading } from "@common/types/Loading";

import historyDummies from "@^histories/assets/dummies/historyDummies";
import HistoryCell from "@^histories/components/HistoryListCell/HistoryListCell.vue";
import { useHistoryStore, type HistoryCategory } from "@^histories/stores/historyStore";

import { storeToRefs } from "pinia";

const historyStore = useHistoryStore();
const { histories, categorizedHistories, selected } = storeToRefs(historyStore);

const headerLabel = (category: HistoryCategory) => {
  switch (category) {
    case "REQUESTED":
      return "요청된 기록";
    case "USING":
      return "사용 중인 기록";
    case "LOST":
      return "분실된 기록";
    case "RETURNED":
      return "반납된 기록";
    case "EXPIRED":
      return "취소된 기록";
  }
};

const initSelected = () => {
  for (const histories of categorizedHistories.value) {
    if (histories.histories.size !== 0) {
      updateSelected({ category: histories.category, index: 0 });
      return;
    }
  }
};

const updateSelected = (newVal: { category: HistoryCategory; index: number }) => {
  if (JSON.stringify(newVal) === JSON.stringify(selected.value)) return;
  console.log(newVal);
  historyStore.updateSelected(newVal);
};

const updateHistories = () => {
  historyStore.updateHistories({
    load: () => {
      // return undefined;
      // return loading;
      return historyDummies;
    }
  });
};

updateHistories();
initSelected();
</script>

<template>
  <section class="history-list">
    <template v-if="histories === loading">
      <LoadingView></LoadingView>
    </template>
    <template v-else-if="histories === undefined">
      <DataLoadFailView></DataLoadFailView>
    </template>
    <template v-else>
      <template v-for="histories in categorizedHistories">
        <section v-show="histories.histories.size > 0">
          <section class="cell-header">{{ headerLabel(histories.category) }}</section>
          <HistoryCell
            v-for="(history, index) of histories.histories"
            key="history"
            v-bind="{
              history: history,
              selected:
                JSON.stringify(selected) ==
                JSON.stringify({ category: histories.category, index: index })
            }"
            @click="updateSelected({ category: histories.category, index: index })"
          ></HistoryCell>
          <template
            v-if="
              (histories.category === 'RETURNED' || histories.category === 'EXPIRED') &&
              histories.histories.size >= 5
            "
          >
            <section class="cell-hider">
              <span>더 보기</span>
              <i class="bi bi-chevron-down"></i>
            </section>
          </template>
        </section>
      </template>
    </template>
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

<script setup lang="ts">
import HistoryCell from "@/components/HistoryCell.vue";
import historyDummies from "@/assets/dummies/histories";
import { computed, ref } from "vue";

const allHistories = ref(historyDummies);
const requestedHistories = computed(() => {
  var output = [];
  for (var history of allHistories.value) {
    if (history.status == "REQUESTED") output.push(history);
  }
  return output;
});
const usingHistories = computed(() => {
  var output = [];
  for (var history of allHistories.value) {
    if (history.status == "USING" || history.status == "DELAYED") output.push(history);
  }
  return output;
});

const lostHistories = computed(() => {
  var output = [];
  for (var history of allHistories.value) {
    if (history.status == "LOST") output.push(history);
  }
  return output;
});

const returnedHistories = computed(() => {
  var output = [];
  for (var history of allHistories.value) {
    if (history.status == "RETURNED") output.push(history);
  }
  return output;
});

const cancelHistories = computed(() => {
  var output = [];
  for (var history of allHistories.value) {
    if (history.status == "EXPIRED") output.push(history);
  }
  return output;
});
</script>

<template>
  <section class="history-list">
    <section v-show="requestedHistories.length > 0">
      <section class="cell-header">요청된 기록</section>
      <HistoryCell
        v-for="history in requestedHistories"
        key="history"
        v-bind="{ history: history }"
      ></HistoryCell>
    </section>

    <section v-show="usingHistories.length > 0">
      <section class="cell-header">사용 중인 기록</section>
      <HistoryCell
        v-for="history in usingHistories"
        key="history"
        v-bind="{ history: history }"
      ></HistoryCell>
    </section>

    <section v-show="lostHistories.length > 0">
      <section class="cell-header">분실된 기록</section>
      <HistoryCell
        v-for="history in lostHistories"
        key="history"
        v-bind="{ history: history }"
      ></HistoryCell>
    </section>

    <section v-show="returnedHistories.length > 0">
      <section class="cell-header">반납된 기록</section>
      <HistoryCell
        v-for="history in returnedHistories"
        key="history"
        v-bind="{ history: history }"
      ></HistoryCell>
      <section class="cell-hider">
        <span>더 보기</span>
        <i class="bi bi-chevron-down"></i>
      </section>
    </section>

    <section v-show="cancelHistories.length > 0">
      <section class="cell-header">취소된 기록</section>
      <HistoryCell
        v-for="history in cancelHistories"
        key="history"
        v-bind="{ history: history }"
      ></HistoryCell>
      <section class="cell-hider">
        <span>최소화 하기</span>
        <i class="bi bi-chevron-up"></i>
      </section>
    </section>
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

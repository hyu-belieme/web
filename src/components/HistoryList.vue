<script setup>
import HistoryCell from "@/components/HistoryCell.vue";
</script>

<template>
  <section class="history-list">
    <!-- history-list-header-cell -->
    <section class="cell-header">요청된 기록</section>
    <HistoryCell
      v-bind="{
        item: {
          stuffName: '우산',
          stuffEmoji: '🌂',
          num: 1,
          status: 'USABLE'
        },
        num: 1,
        status: 'EXPIRED',
        reservedTimestamp: 1678276395,
        requester: {
          studentId: 'DEV1',
          name: '개발자1'
        },
        cancelTimestamp: 1678276717,
        cancelManager: {
          studentId: 'DEV1',
          name: '개발자1'
        }
      }"
    ></HistoryCell>

    <!-- history-list-header-cell -->
    <section class="cell-header">요청된 기록</section>

    <!-- history-list-header-cell -->
    <section class="cell-header">요청된 기록</section>

    <!-- show-more-cell -->
    <section class="cell-hider">
      <span>더 보기</span>
      <i class="bi bi-chevron-down"></i>
    </section>

    <!-- history-list-header-cell -->
    <section class="cell-header">요청된 기록</section>

    <!-- show-more-cell -->
    <section class="cell-hider">
      <span>최소화 하기</span>
      <i class="bi bi-chevron-up"></i>
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

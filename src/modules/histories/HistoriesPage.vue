<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useUserStore } from "@common/stores/userStore";

import HistoryEmptyPageRouter from "@^histories/components/HistoryEmptyPageRouter/HistoryEmptyPageRouter.vue";

const userStore = useUserStore();
const { userMode } = storeToRefs(userStore);
</script>

<template>
  <section class="history-list-page" :key="userMode">
    <HistoryEmptyPageRouter></HistoryEmptyPageRouter>
  </section>
</template>

<style lang="scss" scoped>
$list-tab-ratio: 16;
$detail-tab-ratio: 25;

.history-list-page {
  height: 100%;

  display: flex;
  flex-direction: row;
  gap: map-get($map: $spacers, $key: 4);

  padding-bottom: map-get($map: $spacers, $key: 4);

  .history-list {
    max-width: calc(100% * $list-tab-ratio / ($list-tab-ratio + $detail-tab-ratio));
    height: 100%;
    flex-basis: 0;
    flex-grow: $list-tab-ratio;
  }

  .history-detail {
    max-width: calc(100% * $detail-tab-ratio / ($list-tab-ratio + $detail-tab-ratio));
    height: 100%;
    flex-basis: 0;
    flex-grow: $detail-tab-ratio;
  }
}
</style>

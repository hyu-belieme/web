<script setup lang="ts">
import HistoryPageOnCommon from "@^histories/components/HistoryPageOnCommon/HistoryPageOnCommon.vue";
import HistoryPageOnEmpty from "@^histories/components/HistoryPageOnEmpty/HistoryPageOnEmpty.vue";
import { getHistoryListQuery } from "@^histories/components/utils/utils";

const { data, isLoading, isError, isSuccess } = getHistoryListQuery();
</script>

<template>
  <HistoryPageOnCommon
    v-if="isLoading || isError || (isSuccess && data?.size !== 0)"
  ></HistoryPageOnCommon>
  <HistoryPageOnEmpty v-else></HistoryPageOnEmpty>
</template>

<style lang="scss" scoped>
$list-tab-ratio: 16;
$detail-tab-ratio: 25;
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
</style>

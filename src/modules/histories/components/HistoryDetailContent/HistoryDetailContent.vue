<script setup lang="ts">
import DataLoadFailView from "@common/components/DataLoadFailView/DataLoadFailView.vue";
import LoadingView from "@common/components/LoadingView/LoadingView.vue";

import ActionButtons from "@^histories/components/HistoryDetailButtons/HistoryDetailButtons.vue";
import InfoLabel from "@^histories/components/HistoryDetailInfoLabel/HistoryDetailInfoLabel.vue";
import InfoList from "@^histories/components/HistoryDetailInfoList/HistoryDetailInfoList.vue";
import { getHistoryDetailQuery } from "@^histories/queries/HistoryQueries";

const { isLoading, isSuccess } = getHistoryDetailQuery();
</script>

<template>
  <section class="history-info">
    <template v-if="isSuccess">
      <InfoLabel></InfoLabel>
      <InfoList></InfoList>
      <ActionButtons></ActionButtons>
    </template>
    <template v-else-if="isLoading">
      <LoadingView></LoadingView>
    </template>
    <template v-else>
      <DataLoadFailView></DataLoadFailView>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.history-info {
  display: flex;
  flex-direction: column;

  gap: map-get($map: $spacers, $key: 4);
}
</style>
